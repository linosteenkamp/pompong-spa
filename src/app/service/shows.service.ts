import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

import {AuthHttp} from 'angular2-jwt';

import {FileSizeInfoService} from './file-size-info.service';
import {environment} from '../../environments/environment';
import {Season} from '../interfaces/season';
import {Show} from '../interfaces/show';
import {Genre} from '../interfaces/genre';

@Injectable()
export class ShowsService {
  private url = environment.api_url;

  static downloadFile(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.match('[^/]+$');
    link.click();
  }

  constructor(
    public authHttp: AuthHttp,
    public fileSizeInfo: FileSizeInfoService,
    private router: Router
  ) {}

  public getShows() {
    return this.authHttp
      .get(this.url + 'shows')
      .toPromise()
      .then(res => this.mapShows(res, this.fileSizeInfo))
      .catch(this.handleError);
  }

  public getGenres() {
    return this.authHttp
      .get(this.url + 'genres')
      .toPromise()
      .then(this.mapGenres)
      .catch(this.handleError);
  }

  public getRsyncFile() {
    return this.authHttp
      .get(this.url + 'rsync')
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  public updateShow(show: Show): Observable<Show> {
    return this.authHttp
      .put(this.url + 'shows/' + show.id + '/update', show)
      .map(() => {})
      .catch(this.handleError);
  }

  private mapGenres = (response: Response) => {
    const genres = response.json();
    return genres.map(function(genre: Genre) {
      genre.selected = true;
      return genre;
    });
  }

  private mapShows = (response: Response, fileSizeInfo: FileSizeInfoService) => {
    const shows = response.json();
    return shows.map(function (show: Show) {
      show.display_card = false;
      show.display_overview = false;
      show.seasons_indeterminate = false;
      show.file_size = +0;
      show.selected_file_size = +0;
      show.seasons.forEach(function (season: Season) {
        season.selected = (season.users.length > 0);
        if (season.selected) {
          show.selected_file_size += +season.file_size;
          fileSizeInfo.selectedSize +=  +season.file_size;
        }
        show.file_size += +season.file_size;
        fileSizeInfo.totalSize += +season.file_size;
      });
      return show;
    });
  }

  private handleError = (error: any): Promise<any> => {
    // console.error('An error occurred', error); // for demo purposes only

    if (error.message === 'No JWT present or has expired') {
      this.router.navigateByUrl('/login').then(() => {
        return Promise.reject(error.message);
      });
    } else {
      return Promise.reject(error.message || error);
    }
  }
}
