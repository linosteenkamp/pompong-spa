import { Component, OnInit }                from '@angular/core';
import { ActivatedRoute, Params, Router }   from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { AppUser }                          from "../../interfaces/app-user";
import { AuthService }                      from "../../service/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  user: AppUser;
  appForm : FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = {
      name: '',
      email: '',
      password: '',
      token: ''
    };

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.user.token = params['token'];
    });

    this.buildForm();
  }

  buildForm(): void {
    this.appForm = this.fb.group({
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(24)
      ]]
    });
  }

  onReset() {
    this.auth.resetPassword(this.user)
      .subscribe(
        data => null,
        error => console.log(error),
        () => this.router.navigateByUrl('/login')
      )
  }

}
