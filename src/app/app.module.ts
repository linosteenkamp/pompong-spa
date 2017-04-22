// Angular
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from "@angular/platform-browser/animations";

// Angular Flex Layout
import { FlexLayoutModule }         from '@angular/flex-layout';

// Angular Material
import 'hammerjs';
import {
MdToolbarModule, MdMenuModule, MdSidenavModule, MdTabsModule, MdDialogModule,
MdButtonModule, MdIconModule, MdCheckboxModule, MdCardModule, MdInputModule
}                                   from '@angular/material';

// External components
import { InViewportModule }         from 'ng-in-viewport';

// App
import { AppComponent }             from "./app.component";

// Modules
import { AppRoutingModule }         from "./modules/app-routing.module";
import { AuthModule }               from "./modules/app-auth.module";

// Components
import { ContentComponent }         from './component/content/content.component';
import { LoginComponent }           from './component/login/login.component';

// Services
import { ShowsService }             from "./service/shows.service";
import { AuthService }              from "./service/auth.service";
import { AuthGuard }                from "./service/auth.guard";

// Dialogs
import { MessageComponent }         from './dialog/message/message.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    LoginComponent,
    MessageComponent,
    ResetPasswordComponent
  ],
  entryComponents: [
    MessageComponent
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
    MdDialogModule,
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
