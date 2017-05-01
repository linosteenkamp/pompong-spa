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
      .post(this.url + 'login', user)
      .map(res => res.json());
  }

  register(user) {
    return this.http
      .post(this.url + 'users', user)
      .map(res => res.json());
  }

  resetRequest(user) {
    return this.http
      .post(this.url + 'resetRequest', user)
      .map(res => res.json());
  }

  resetPassword(user) {
    return this.http
      .post(this.url + 'resetPassword', user)
      .map(res => res.json());
  }

  loggedIn(): boolean {
    return tokenNotExpired();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login').then();
  }
}
