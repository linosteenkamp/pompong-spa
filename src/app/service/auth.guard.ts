import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if (tokenNotExpired()) {
      return true;
    } else {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login').then(() => {
        return false;
      });
    }
  }
}
