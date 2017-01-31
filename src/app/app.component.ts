import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { LoginService } from './login/login.service';
import { AppState, RESET } from './login/loginCounter';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css',
    './css/bootstrap.min.css',
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private loginCounter: Observable<number>;
  private isLoggedIn: boolean = false;

  constructor(private store: Store<AppState>, private loginService: LoginService) {
    this.loginCounter = store.select('loginCounter');
  }

  ngOnInit() {
    this.loginService.getLoggedInObservable()
      .subscribe(result => {
          this.isLoggedIn = result;
        });
  }

  private logOut() {
    this.loginService.logout();
  }

  private resetLoginCounter() {
    this.store.dispatch({ type: RESET });
  }
}