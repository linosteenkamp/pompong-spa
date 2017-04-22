import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AppUser }                        from "../../interfaces/app-user";
import { AuthService }                    from "../../service/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  user: AppUser;

  constructor(private auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
