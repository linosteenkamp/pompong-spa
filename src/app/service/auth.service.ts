import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {

  private url = environment.api_url;
  constructor(private http: Http, private router: Router) { }

  login(user) {
    return this.http
      .post(this.url + 'user/login', user)
      .map(res => res.json());
  }

  register(user) {
    return this.http
      .post(this.url + 'user', user)
      .map(res => res.json());
  }

  resetRequest(user) {
    return this.http
      .post(this.url + 'user/forgot', user);
  }

  resetPassword(user) {
    return this.http
      .post(this.url + 'user/reset', user);
  }

  loggedIn(): boolean {
    return tokenNotExpired();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login').then();
  }
}
