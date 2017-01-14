import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from './course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent {
  private courses: Course[];
  private filteredCourses: Course[];
  private filterText: string = '';

  constructor(private router: Router, private coursesService: CoursesService) {
  }

  public filter(): void {
    let result:Course[] = [];

    this.courses.forEach((item, index) => {
      if (item.name.toLowerCase().includes(this.filterText.trim().toLowerCase())) {
        result.push(item);
      }
    });

    this.filteredCourses = result;
  }

  private resetFilteredCourses(): void {
    this.filteredCourses = [].concat(this.courses);
  }

  public clearFilter(): void {
    this.filterText = '';
    this.resetFilteredCourses();
  }

  public goNewCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  public goEditCourse(course: Course): void {
    this.router.navigate([`/courses/${course.id}`]);
  }

  public deleteCourse(course: Course): void {
    if (confirm('Are you sure? This course will be removed')) {
      this.coursesService.delete(course.id).subscribe(result => {
        if (result) {
          let index = this.courses.indexOf(course, 0);

          if (index !== -1) {
              this.courses.splice(index, 1);
          }
        }
      });
    }
  }

  ngOnInit() {
    this.coursesService.get().subscribe(courses => {
      this.courses = courses;
      this.resetFilteredCourses();
    });
  }
}
