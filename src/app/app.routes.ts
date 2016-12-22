import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { CoursesComponent } from './courses';
import { AddEditCourseComponent } from './add-edit-course';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: CoursesComponent },
  { path: 'courses/:id', component: AddEditCourseComponent},
  { path: 'courses',  component: CoursesComponent },
  { path: 'login',  component: LoginComponent },
  { path: '**',    component: NoContentComponent },
];
