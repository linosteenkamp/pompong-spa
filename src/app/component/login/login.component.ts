import {Component, OnInit }         from '@angular/core';
import { Router }                   from '@angular/router';
import { MdDialog }                 from '@angular/material';

import { AuthService }              from '../../service/auth.service';
import { AppUser }                  from '../../interfaces/app-user';
import { MessageComponent }         from "../../dialog/message/message.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  user: AppUser;
  loginError = false;
  tabIndex = 0;
  loginForm : FormGroup;
  registerForm : FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MdDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = {
      name: '',
      email: '',
      password: '',
      token: ''
    };
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: [this.user.password, [
        Validators.required,
      ]],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ]]
    });

    this.registerForm = this.fb.group({
      name: [this.user.name, [
        Validators.required,
        Validators.minLength(2)
      ]],
      email: [this.user.password, [
        Validators.required,
      ]],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ]]

    })
  }

  onLogin() {
    this.auth.login(this.user)
      .subscribe(
        data => localStorage.setItem('token', data.token),
        error => {
          console.log(error);
          if (error.status === 401) {
            this.loginError = true;
            this.dialog.open(MessageComponent, {data: {
              title: 'Login Error',
              message: 'Login error, please verify email address and password'
            }});
          } else {
            console.log(error);
          }
        },
        () => this.router.navigateByUrl('/content')
      );
  }

  onRegister() {
    this.auth.register(this.user)
      .subscribe(
        data => null,
        error => console.log(error),
        () => {
          this.dialog.open(MessageComponent, {data: {
            title: 'Registration',
            message: 'Your request has been submitted to the system administrator.'
          }});

          this.tabIndex = 0
        }
      );
  }

  onReset() {
    this.auth.resetRequest(this.user)
      .subscribe(
        data => null,
        error => console.log(error),
        () => {
          this.dialog.open(MessageComponent, {data: {
            title: 'Password Reset',
            message: 'A email has been sent to the registered email address to reset the password.'
          }});
        }
      )
  }
}
