import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShowsService }                         from "../../service/shows.service";

import {Season} from "../../interfaces/season";

@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.scss']
})
export class ContentComponent implements OnInit {

  public shows;
  public filteredShows;
  public myShows = false;

  public genres;
  public genresSelected = true;
  public genresIndeterminate = false;

  public statuses;
  public statusSelected = true;
  public statusIndeterminate = false;

  constructor(private showsService: ShowsService, private ref: ChangeDetectorRef) {
    this.statuses =  [
      { "name": "Continuing", "selected": true },
      { "name": "Ended", "selected": true },
    ];
  }

  ngOnInit() {
    this.getShows();
    this.getGenres();
  }

  getShows(): void {
    this.showsService.getShows().then(shows => {
      this.shows = shows;
      this.filteredShows = ContentComponent.filterShows(this.shows, this.myShows, this.statuses, this.genres);
    });
  }

  getGenres(): void {
    this.showsService.getGenres().then(genres => {
      this.genres = genres;
    })
  }

  inViewport(event, show): void {
    show.display_card = event.value;
    this.ref.detectChanges();
  }

  seasonClicked(show, season): void {
    season.selected = !season.selected;
    if (season.selected) {
      show.selected_file_size += +season.file_size;
      this.showsService.fileSizeInfo.selectedSize += +season.file_size;
    } else {
      show.selected_file_size -= +season.file_size;
      this.showsService.fileSizeInfo.selectedSize -= +season.file_size;
    }

    this.showsService.sendMessage();

    this.showsService.updateShow(show).then();
    this.ref.detectChanges();
  }

  tabSelected(tab, show): void {
    show.display_overview = (tab === 'overview');
    this.ref.detectChanges();
  }

  allGenresClicked(): void {
    this.genresSelected = !this.genresSelected;
    this.genres.forEach(item => item.selected = this.genresSelected);
    this.genresIndeterminate = false;
    this.filteredShows = ContentComponent.filterShows(this.shows, this.myShows, this.statuses, this.genres);
  }

  allStatusClicked(): void {
    this.statusSelected = !this.statusSelected;
    this.statuses.forEach(item => item.selected = this.statusSelected);
    this.statusIndeterminate = false;
    this.filteredShows = ContentComponent.filterShows(this.shows, this.myShows, this.statuses, this.genres);
  }

  filterClicked( status ): void {
    status.selected = !status.selected;

    this.genresIndeterminate = this.isIndeterminate(this.genres);
    if (!this.genresIndeterminate) {
      this.genresSelected = this.genres[0].selected;
    }

    this.statusIndeterminate = this.isIndeterminate(this.statuses);
    if (!this.statusIndeterminate) {
      this.statusSelected = this.statuses[0].selected;
    }

    this.filteredShows = ContentComponent.filterShows(this.shows, this.myShows, this.statuses, this.genres);
  }

  myShowsClicked(): void {
    this.myShows = !this.myShows;
    this.filteredShows = ContentComponent.filterShows(this.shows, this.myShows, this.statuses, this.genres);
  }

  static filterShows (shows, myShows, statuses, genres) {
    return shows.filter(function (show) {
      return (
        ContentComponent.myShowsFilter(show.seasons, myShows)
        && ContentComponent.statusFilter(show, statuses)
        && ContentComponent.genreFilter(show.genres, genres)
      )
    });
  }

  static statusFilter(show, selection) {
    let showStatus = show.status;

    return selection.some(function (item) {
      return (item.name === showStatus && item.selected === true);
    });
  }

  static genreFilter(genres, selection) {
    return genres.some(function (item) {
      let genre = item.genre;
      return selection.some( function (item) {
        return (item.name === genre && item.selected === true);
      });
    });
  }

  static myShowsFilter(season, myShows) {
    return season.some(function (item: Season) {
      return myShows? item.selected : true;
    });
  }

  private isIndeterminate(array) {
    let result = array.reduce( function(prev, next) {
      prev[next.selected] = (prev[next.selected] + 1) || 1;
      return prev;
    },{});

    return ('true' in result && 'false' in result);
  }
}
