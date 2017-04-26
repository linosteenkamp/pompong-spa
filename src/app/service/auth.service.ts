import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {

  private url = 'https://pompong.steenkamps.org/api/';
  constructor(private http: Http) { }

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


}
