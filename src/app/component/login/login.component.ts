import { Component, OnInit }  from '@angular/core';
import { Router }             from "@angular/router";
import { tokenNotExpired }    from "angular2-jwt";

import { AuthService }        from "../../service/auth.service";

interface Credentials {
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: Credentials;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.credentials = {
      email: '',
      password: ''
    }
  }

  onLogin() {
    this.auth.login(this.credentials)
      .subscribe(
        data => localStorage.setItem('token', data.token),
        error => {
          console.log(error);
          if (error.status === 401) {
            this.errorMsg = 'Login error, please verify email address and password';
          } else {
            this.errorMsg = error.statusMessage;
          }
        },
        () => this.router.navigateByUrl('/content')
      );
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
