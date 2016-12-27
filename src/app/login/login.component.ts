import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

import { Credentials } from './credentials';

@Injectable()
@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private showWrongCredentialsAlert: boolean = false;
  private credentials: Credentials = new Credentials();

  constructor(private router: Router, private loginService: LoginService) {
  }

  public ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  public logIn(): void {
    this.loginService.login(this.credentials.loginName, this.credentials.password).subscribe(user => {
      if (user) {
        this.router.navigate(['']);
      } else {
        this.credentials.password = '';
        this.showWrongCredentialsAlert = true;
      }
    });
  }
}