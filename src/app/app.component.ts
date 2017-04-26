import { ChangeDetectorRef, Component, OnDestroy }  from '@angular/core';
import { tokenNotExpired }                          from "angular2-jwt";
import { ShowsService }                             from "./service/shows.service";
import { Subscription }                             from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  title = 'Pompong';

  subscription: Subscription;

  constructor(public showsService: ShowsService, private ref: ChangeDetectorRef) {
    this.subscription = this.showsService.getMessage().subscribe(message => this.ref.detectChanges());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  downloadRsyncFile() {
    this.showsService.getRsyncFile().then(data => AppComponent.downloadFile(data))
  }

  static downloadFile(data){
    let url = "https://pompong.steenkamps.org/" + data["file_name"];

    let link = document.createElement("a");
    link.download = "a";
    link.href = url;
    link.click();
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.removeItem('token');
  }}
