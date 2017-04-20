import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import {
  MdToolbarModule, MdMenuModule, MdSidenavModule, MdTabsModule,
  MdButtonModule, MdIconModule, MdCheckboxModule, MdCardModule, MdInputModule
}                                   from '@angular/material';
import { FlexLayoutModule }         from '@angular/flex-layout';
import { BrowserAnimationsModule }  from "@angular/platform-browser/animations";
import { InViewportModule }         from 'ng-in-viewport';

import { AppComponent }             from "./app.component";
import { AppRoutingModule }         from "./app-routing.module";
import { AuthModule }               from "./app-auth.module";
import { ContentComponent }         from './component/content/content.component';
import { LoginComponent }           from './component/login/login.component';

import { ShowsService }             from "./service/shows.service";
import { AuthService }              from "./service/auth.service";
import { AuthGuard }                from "./service/auth.guard";

import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdToolbarModule,
    MdMenuModule,
    MdSidenavModule,
    MdButtonModule,
    MdIconModule,
    MdCheckboxModule,
    MdCardModule,
    MdInputModule,
    MdTabsModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InViewportModule.forRoot(),
    AuthModule
  ],
  providers: [
    ShowsService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
