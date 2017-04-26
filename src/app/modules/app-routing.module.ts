/**
 * Created by linosteenkamp on 2017/04/01.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from '../component/content/content.component';
import { LoginComponent } from '../component/login/login.component';
import { ResetPasswordComponent } from '../component/reset-password/reset-password.component';

import { AuthGuard } from '../service/auth.guard';
import { GeneralGuard } from '../service/general.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/content', pathMatch: 'full' },
  { path: 'content',    component: ContentComponent, canActivate: [AuthGuard] },
  { path: 'login',      component: LoginComponent, canActivate: [GeneralGuard] },
  { path: 'reset',      component: ResetPasswordComponent, canActivate: [GeneralGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
