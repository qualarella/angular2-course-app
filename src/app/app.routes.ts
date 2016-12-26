import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { CoursesComponent } from './courses';
import { AddEditCourseComponent } from './add-edit-course';
import { LoggedInGuard } from './login/logged-in.guard';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses/:id', component: AddEditCourseComponent, canActivate: [LoggedInGuard]},
  { path: 'courses', component: CoursesComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/courses' }
];
