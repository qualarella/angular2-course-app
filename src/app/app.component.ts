import { Component, ViewEncapsulation } from '@angular/core';

import { LoginService } from './login/login.service';

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
  private isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.getLoggedInObservable()
      .subscribe(result => {
          this.isLoggedIn = result;
        });
  }

  public logOut() {
      this.loginService.logout();
  }
}