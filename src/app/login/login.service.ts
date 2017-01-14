import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscriber } from 'rxjs/Subscriber';

import { User } from './user';

export class LoginService {
  private AUTH_USER_KEY: string = 'auth_user';
  private VALID_LOGIN: string = 'q';
  private VALID_PASSWORD: string = 'q';

  private loggedIn = new ReplaySubject<boolean>(1);

  constructor() {
    this.loggedIn.next(this.isLoggedIn());
  }

  public login(login: string, password: string): Observable<User> {
    return new Observable<User>((subscriber: Subscriber<User>) => {
      let checked: boolean = this.checkLogin(login, password);
      let user: User = null;
      
      if (checked) {
          user = new User(login);
      
          localStorage.setItem(this.AUTH_USER_KEY, JSON.stringify(user));

          this.loggedIn.next(true);
      }
      
      return subscriber.next(user)
    });
  }

  private checkLogin(login: string, password: string): boolean {
    return login === this.VALID_LOGIN && password === this.VALID_PASSWORD;
  }

  public logout(): void {
    localStorage.removeItem(this.AUTH_USER_KEY);

    this.loggedIn.next(false);
  }

  public getLoggedInObservable(): ReplaySubject<boolean> {
    return this.loggedIn;
  }

  public isLoggedIn(): boolean {
      return !!localStorage.getItem(this.AUTH_USER_KEY);
  }
}