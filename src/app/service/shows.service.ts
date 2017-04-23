import { Response }                 from "@angular/http";
import { Injectable }               from '@angular/core';
import { AuthHttp }                 from "angular2-jwt";
import 'rxjs/add/operator/toPromise';

import { Show }                     from "../interfaces/show";
import { Season }                   from "../interfaces/season";

export interface FileSizeInfo {
  all: number;
  selected: number;
}

@Injectable()
export class ShowsService {
  private pompongUrl = 'https://pompong.steenkamps.org/api/';  // URL to web api

  fileSizeInfo: FileSizeInfo = {
    all: 0,
    selected: 0
  };

  constructor(public authHttp: AuthHttp) {}

  getShows() {
    return this.authHttp
      .get(this.pompongUrl + 'shows')
      .toPromise()
      .then(res => ShowsService.mapShow(res))
      .catch(ShowsService.handleError);
  }

  getGenres() {
    return this.authHttp
      .get(this.pompongUrl + 'genres')
      .toPromise()
      .then(ShowsService.extractGenreData)
      .catch(ShowsService.handleError);
  }

  getRsyncFile() {
    return this.authHttp
      .get(this.pompongUrl + 'rsync')
      .toPromise()
      .then((res:Response) => res.json())
      .catch(ShowsService.handleError);
  }

  // updateShow(show): Observable<Show> {
  //   return this.authHttp.put(this.pompongUrl + 'shows/' + show.id + '/update', { show })
  //     .map(res => res.json())
  //     .catch(ShowsService.handleError);
  // }

  updateShow(show) {
    return this.authHttp.put(this.pompongUrl + 'shows/' + show.id + '/update', show)
      .toPromise()
      .then()
      .catch(ShowsService.handleError);
  }

  static mapShow(show: Response) {
    let body = show.json();
    return body.map(function (item: Show) {
      let show = item;
      show.display_card = false;
      show.display_overview = false;
      show.file_size = +0;
      show.selected_file_size = +0;
      show.seasons.forEach(function (item: Season) {
        item.selected = (item.users.length > 0);
        if (item.selected) {
          show.selected_file_size = +show.selected_file_size + +item.file_size;
        }
        show.file_size = +show.file_size + +item.file_size;
      });
      return item;
    });
  }

  static extractGenreData(res: Response) {
    let body = res.json();
    let genres = [];

    for (let i = 0; i < body.length; i++) {
      let tmp = {
        "name": body[i].genre,
        "selected": true
      };
      genres.push(tmp);
    }
    return genres;
  }

  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
