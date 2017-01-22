import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { Course } from '../courses/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'add-edit-course',
  templateUrl: './add-edit-course.component.html'
})
export class AddEditCourseComponent {
  private id: string;
  private sub: any;
  private editCourseName: string;
  private isEditMode: boolean;

  private course: Course;

  private courseForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private coursesService: CoursesService) {
    this.courseForm = new FormGroup({
      "courseName": new FormControl('', Validators.required),
      "courseDescription": new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id === 'new') {
        this.isEditMode = false;

        this.editCourseName = 'New Course';

        this.course = new Course();
      } else {
        this.isEditMode = true;

        this.coursesService.get(+this.id).subscribe(courses => {
          this.course = courses[0];

          this.courseForm.patchValue(
            {
              courseName: this.course.name,
              courseDescription: this.course.description
            }
          );

          this.editCourseName = this.course.name;
        });
      }
    });
  }

  public save(): void {

    // update breadcrumbs & id
  }

  public cancel(): void {
    this.router.navigate(['./courses']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}