import { Response }                 from "@angular/http";
import { Injectable }               from '@angular/core';
import { AuthHttp }                 from "angular2-jwt";
import 'rxjs/add/operator/toPromise';

import { Show }                     from "../interfaces/show";
import { User }                     from "../interfaces/user";
import { Season }                   from "../interfaces/season";
import { Genre }                    from "../interfaces/genre";

@Injectable()
export class ShowsService {
  private pompongUrl = 'https://pompong.steenkamps.org/api/';  // URL to web api

  constructor(public authHttp: AuthHttp) {}

  getShows() {
    return this.authHttp
      .get(this.pompongUrl + 'shows')
      .toPromise()
      .then(this.extractShowData)
      .catch(this.handleError);
  }

  getGenres() {
    return this.authHttp
      .get(this.pompongUrl + 'genres')
      .toPromise()
      .then(this.extractGenreData)
      .catch(this.handleError);
  }

  getRsyncFile() {
    return this.authHttp
      .get(this.pompongUrl + 'rsync')
      .toPromise()
      .then((res:Response) => res.json())
      .catch(this.handleError);
  }

  updateShow(show) {
    return this.authHttp.put(this.pompongUrl + 'shows/' + show.id + '/update', show)
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  private extractGenreData(res: Response) {
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

  private extractShowData(res: Response) {
    let body = res.json();
    let shows = [];

    for (let i = 0; i < body.length; i++) {
      let seasons = [];
      let genres = [];

      for (let k = 0; k < body[i].seasons.length; k++) {
        let users = [];

        for (let j = 0; j < body[i].seasons[k].users.length; j++) {
          let user: User = {
            id: body[i].seasons[k].users[j].id,
            name: body[i].seasons[k].users[j].name,
            email: body[i].seasons[k].users[j].email,
            created_at: body[i].seasons[k].users[j].created_at,
            updated_at: body[i].seasons[k].users[j].updated_at,
            pivot: {
              season_id: body[i].seasons[k].users[j].pivot.season_id,
              user_id: body[i].seasons[k].users[j].pivot.user_id
            }
          };
          users.push(user);
        }

        let season: Season = {
          id: body[i].seasons[k].id,
          show_id : body[i].seasons[k].show_id,
          season: body[i].seasons[k].season,
          file_size: body[i].seasons[k].file_size,
          selected: (users.length > 0),
          users: users
        };
        seasons.push(season);
      }

      for (let k = 0; k < body[i].genres.length; k++) {
        let genre: Genre = {
          id: body[i].genres[k].id,
          genre: body[i].genres[k].genre,
          created_at: body[i].genres[k].created_at,
          updated_at: body[i].genres[k].updated_at,
          pivot: {
            show_id: body[i].genres[k].pivot.show_id,
            genre_id: body[i].genres[k].pivot.genre_id
          }
        };
        genres.push(genre);
      }

      let show: Show = {
        id: body[i].id,
        lang: body[i].lang,
        network: body[i].network,
        quality: body[i].quality,
        show_name: body[i].show_name,
        status: body[i].status,
        tvdb_id: body[i].tvdb_id,
        image_url: body[i].image_url,
        overview: body[i].overview,
        location: body[i].location,
        max_season: body[i].max_season,
        created_at: body[i].created_at,
        updated_at: body[i].updated_at,
        display_card: false,
        display_overview: false,
        genres: genres,
        seasons: seasons
      };

      shows.push(show);
    }
    return shows;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
