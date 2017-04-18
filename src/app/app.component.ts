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

  constructor(private showsService: ShowsService) {}

  downloadRsyncFile() {
    this.showsService.getRsyncFile().then(data => this.downloadFile(data))
  }

  downloadFile(data){
    var url = "https://pompong.steenkamps.org/" + data["file_name"];

    var link = document.createElement("a");
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
