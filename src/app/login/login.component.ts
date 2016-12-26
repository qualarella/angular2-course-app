import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private loginName: string = '';
  private password: string = '';

  private showWrongCredentialsAlert: boolean = false;

  private isLoginNameInInitState: boolean = true;
  private isLoginNameFieldInFocus: boolean = false;

  private isPasswordInInitState: boolean = true;
  private isPasswordFieldInFocus: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {
  }

  public ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  public logIn(): void {
    this.loginService.login(this.loginName, this.password).subscribe(user => {
      if (user) {
        this.router.navigate(['']);
      } else {
        this.password = '';
        this.showWrongCredentialsAlert = true;
      }
    });
  }

  public onLoginNameFieldBlur(): void {
    this.isLoginNameFieldInFocus = false;

    this.loginName = this.clearLoginName(this.loginName);
  }

  public onPasswordFieldBlur(): void {
    this.isPasswordFieldInFocus = false;

    this.password = this.clearPassword(this.password);
  }

  public onLoginNameFieldFocus(): void {
      this.isLoginNameInInitState = false;
      this.isLoginNameFieldInFocus = true;
  }

  public onPasswordFieldFocus(): void {
    this.isPasswordInInitState = false;
    this.isPasswordFieldInFocus = true;
  }

  public isLoginNameValid(): boolean {
    return this.clearLoginName(this.loginName).length > 0;
  }

  public isPasswordValid(): boolean {
    return this.clearPassword(this.password).length > 0;
  }

  private clearLoginName(value: string): string {
    return value.replace(/[^a-zA-Z]/g, '');
  }

  private clearPassword(value: string): string {
    return value.replace(/[^0-9a-zA-Z]/g, '');
  }
}