import { Injectable } from '@angular/core';
import { Http }       from "@angular/http";

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  login(credentials) {
    return this.http
      .post('https://pompong.steenkamps.org/api/login', credentials)
      .map(res => res.json());
  }

}
