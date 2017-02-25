import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { Course } from '../courses/course';
import { CoursesService } from '../services/courses.service';

import * as moment from 'moment/moment';

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

  private submitted: boolean = false;
  private courseForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private coursesService: CoursesService) {
    this.courseForm = new FormGroup({
      courseName: new FormControl('', Validators.required),
      courseDescription: new FormControl('', Validators.required),
      courseDuration: new FormControl('0', Validators.required),
      courseCreated: new FormControl('', Validators.required)
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

          this.courseForm.setValue(
            {
              courseName: this.course.name,
              courseDescription: this.course.description,
              courseDuration: this.course.duration,
              courseCreated: moment.utc(this.course.created).format('MM.DD.YYYY')
            }
          );

          this.editCourseName = this.course.name;
        });
      }
    });
  }

  public save(): void {
    this.submitted = true;

    if (this.courseForm.invalid) {
      alert('Validation errors');

      return;
    }

    this.course.name = this.courseForm.value.courseName;
    this.course.description = this.courseForm.value.courseDescription;
    this.course.duration = this.courseForm.value.courseDuration;

    this.course.created = moment.utc(this.courseForm.value.courseCreated, 'MM.DD.YYYY').toDate();

    if (this.isEditMode) {
      this.coursesService.put(this.course).subscribe(() => {
        this.editCourseName = this.course.name;
      });

      return;
    }

    this.coursesService.post(this.course).subscribe(id => {
      this.router.navigate([`/courses/${id}`]);
    });
  }

  public cancel(): void {
    this.router.navigate(['./courses']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}