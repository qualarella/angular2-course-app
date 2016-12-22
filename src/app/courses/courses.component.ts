import { Component } from '@angular/core';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Courses` component');
  }
}
