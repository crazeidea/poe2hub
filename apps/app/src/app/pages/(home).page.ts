import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './(home).page.html',
  schemas: [NO_ERRORS_SCHEMA],
})
export default class HomePage {}
