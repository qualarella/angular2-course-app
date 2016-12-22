/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav>
      <span>
        <a [routerLink]=" ['./'] ">
          Index
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./login'] ">
          Login
        </a>
      </span>
	  |
      <span>
        <a [routerLink]=" ['./courses'] ">
          Courses
        </a>
      </span>
	  |
      <span>
        <a [routerLink]=" ['./courses/new'] ">
          New Course
        </a>
      </span>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
    </footer>
  `
})
export class AppComponent {
  constructor() {
  }

  ngOnInit() {
    console.log('Init App');
  }
}
