import { Component }        from '@angular/core';
import { tokenNotExpired }  from "angular2-jwt";
import { ShowsService }     from "./service/shows.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pompong';

  constructor(public showsService: ShowsService) {}

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
