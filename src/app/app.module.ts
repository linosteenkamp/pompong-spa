// Angular
import { NgModule }                 from '@angular/core';
import {FormsModule, ReactiveFormsModule}              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from "@angular/platform-browser/animations";

// Angular Flex Layout
import { FlexLayoutModule }         from '@angular/flex-layout';

// Angular Material
import 'hammerjs';
import {
  MdToolbarModule, MdMenuModule, MdSidenavModule, MdTabsModule, MdDialogModule,
  MdButtonModule, MdIconModule, MdCheckboxModule, MdCardModule, MdInputModule, MdSlideToggleModule
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
import { ResetPasswordComponent }   from './component/reset-password/reset-password.component';

// Dialogs
import { MessageComponent }         from './dialog/message/message.component';

// Services
import { ShowsService }             from "./service/shows.service";
import { AuthService }              from "./service/auth.service";
import { AuthGuard }                from "./service/auth.guard";
import { GeneralGuard }             from "./service/general.guard";
import { FileSizePipe } from './pipe/file-size.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    LoginComponent,
    MessageComponent,
    ResetPasswordComponent,
    FileSizePipe
  ],
  entryComponents: [
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    MdSlideToggleModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InViewportModule.forRoot(),
    AuthModule
  ],
  providers: [
    ShowsService,
    AuthService,
    AuthGuard,
    GeneralGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
