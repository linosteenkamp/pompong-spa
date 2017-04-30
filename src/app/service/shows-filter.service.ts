import {Injectable} from '@angular/core';
import {Season} from '../interfaces/season';

@Injectable()
export class ShowsFilterService {

  static statusFilter(show, selection) {
    const showStatus = show.status;

    return selection.some(function (item) {
      return (item.name === showStatus && item.selected === true);
    });
  }

  static genreFilter(genres, selection) {
    return genres.some(function (item) {
      const genre = item.genre;
      return selection.some( function (thisItem) {
        return (thisItem.genre === genre && thisItem.selected === true);
      });
    });
  }

  static myShowsFilter(season, myShows) {
    return season.some(function (item: Season) {
      return myShows ? item.selected : true;
    });
  }

  constructor() {}

  public filter (shows, myShows, statuses, genres) {
    return shows.filter(function (show) {
      return (
        ShowsFilterService.myShowsFilter(show.seasons, myShows)
        && ShowsFilterService.statusFilter(show, statuses)
        && ShowsFilterService.genreFilter(show.genres, genres)
      );
    });
  }
}
