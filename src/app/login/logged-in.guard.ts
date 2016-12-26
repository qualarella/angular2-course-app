import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) { }

    public canActivate(): boolean {
        let loggedIn = this.loginService.isLoggedIn();

        if (!loggedIn) {
            this.router.navigate(['/login']);
        }

        return loggedIn;
    }
}