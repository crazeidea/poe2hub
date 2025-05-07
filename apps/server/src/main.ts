import $RefParser from '@apidevtools/json-schema-ref-parser';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import compression from 'compression';
import * as express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { NgOpenApiGen } from 'ng-openapi-gen';
import { Options } from 'ng-openapi-gen/lib/options';
import { join } from 'path';
import { AppModule } from './app/app.module';

let disableKeepAlive = false;

/**
 * Nest.js 애플리케이션을 구동합니다.
 * @ignore
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const logger = new Logger(`${process.env.SERVICE_NAME} Server`);

  /** CORS */
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
    maxAge: 86400,
  });

  /** Disable ETag */
  app.disable('etag');

  app.use(express.json({ limit: '500mb' }));

  app.enableShutdownHooks();

  /** Security */
  app.use(
    helmet({
      /** CSP */
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, 'https:', 'src', `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    })
  );

  /** Compression */
  app.use(compression());

  /** Morgan */
  app.use(morgan('dev'));

  /** Global Prefix */
  app.setGlobalPrefix('api');

  /** Versioning */
  app.enableVersioning();

  /** Cookie */

  /** Static Assets */
  app.useStaticAssets(join(__dirname, 'assets'), {
    setHeaders: (res, path) => {
      res.setHeader('Cross-Origin-Opener-Policy', 'cross-origin');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  });

  // Non-stop deploy
  app.use((req, res, next) => {
    if (disableKeepAlive) {
      res.set('Connection', 'close');
    }
    next();
  });

  /** Global Valdation Pipe */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        if (errors && errors.length > 0) {
          const children = errors[0].children;
          if (children && children.length !== 0) {
            const error = children[0].constraints;
            const keys = Object.keys(error);
            const type = keys[keys.length - 1];
            const message = error[type];
            return new BadRequestException(message);
          }
          const error = errors[0].constraints;
          const keys = Object.keys(error);
          const type = keys[keys.length - 1];
          const message = error[type];
          return new BadRequestException(message);
        }
      },
    })
  );

  /** Swagger */
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle(`${process.env.SERVICE_NAME} API`)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          name: 'x-access-token',
          description: 'Enter Access token',
          in: 'header',
        },
        'x-access-token'
      )
      .addApiKey(
        {
          type: 'apiKey',
          name: 'x-refresh-token',
          in: 'header',
        },
        'x-refresh-token'
      )

      .addServer(process.env.HOST)
      .build()
  );

  SwaggerModule.setup('/api/document', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      operationsSorter: operationsSorter,
    },
  });

  logger.log('Swagger Initialized on /api/document');

  if (process.env.NODE_ENV !== 'production') {
    generateApiClient(document as OpenAPIObject).then(() => {
      logger.log('API Client Generated');
    });
  }

  process.on('SIGINT', async () => {
    disableKeepAlive = true;
    await app.close();
    process.exit(0);
  });

  await app.listen(3000, () => {
    logger.log(
      `🚀 ${process.env.SERVICE_NAME} POE2Hub server initialized successfully.`
    );
  });
}

bootstrap();

const generateApiClient = async (document: OpenAPIObject) => {
  const options: Options = {
    input: JSON.parse(JSON.stringify(document)),
    output: 'libs/api-client/src/lib',
    indexFile: true,
    silent: true,
  };

  const RefParser = new $RefParser();
  const openApi = await RefParser.bundle(options.input, {
    dereference: { circular: false },
  });

  const ngOpenGen = new NgOpenApiGen(openApi, options);
  ngOpenGen.generate();
};

function operationsSorter(a, b) {
  const order = ['get', 'post', 'patch', 'put', 'delete'] as const;

  function getMethodOrder(method: (typeof order)[number]) {
    return order.indexOf(method);
  }

  const methodOrder =
    getMethodOrder[a.get('method')] - getMethodOrder[b.get('method')];
  if (methodOrder !== 0) return methodOrder;

  const pathLengthOrder = a.get('path').length - b.get('path').length;
  if (pathLengthOrder !== 0) return pathLengthOrder;

  return a.get('path').localeCompare(b.get('path'));
}
