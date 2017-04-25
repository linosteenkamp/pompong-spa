import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FileSizeInfo, ShowsService}                       from "../../service/shows.service";

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

  // sendMessage(): void {
  //   // send message to subscribers via observable subject
  //   this.showsService.sendMessage(10);
  // }

  getShows(): void {
    this.showsService.getShows().then(shows => {
      this.shows = shows;
      this.filterShows();
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
      show.selected_file_size = +show.selected_file_size + +season.file_size;
    } else {
      show.selected_file_size = +show.selected_file_size - +season.file_size;
    }

    let x = {
      totalSize: show.totalSize,
      selectedSize: show.selected_file_size
    };

    this.showsService.sendMessage(x);

    this.showsService.updateShow(show).then();
    this.ref.detectChanges();
  }

  tabSelected(tab, show): void {
    show.display_overview = (tab === 'overview');
    this.ref.detectChanges();
  }

  genresClicked(): void {
    this.genresSelected = !this.genresSelected;
    this.genres.forEach(item => item.selected = this.genresSelected);
    this.genresIndeterminate = false;
    this.filterShows();
  }

  statusClicked(): void {
    this.statusSelected = !this.statusSelected;
    this.statuses.forEach(item => item.selected = this.statusSelected);
    this.statusIndeterminate = false;
    this.filterShows();
  }

  filterClicked( status ): void {
    status.selected = !status.selected;

    this.genresIndeterminate = ContentComponent.filterChanged(this.genres);
    if (!this.genresIndeterminate) {
      this.genresSelected = this.genres[0].selected;
    }

    this.statusIndeterminate = ContentComponent.filterChanged(this.statuses);
    if (!this.statusIndeterminate) {
      this.statusSelected = this.statuses[0].selected;
    }

    this.filterShows();
  }

  mySowsClicked(): void {
    this.myShows = !this.myShows;
    this.filterShows();
  }

  private filterShows (): void {
    let self = this;

    this.filteredShows = this.shows.filter(function (show) {
      return (
        self.statusFilter(show)
        && self.myShowsFilter(show.seasons)
        && self.genreFilter(show.genres)
      )
    });

    console.info(this.filteredShows.length)
  }

  private statusFilter(show) {
    let showStatus = show.status;

    return this.statuses.some(function (item) {
      return (item.name === showStatus && item.selected === true);
    });
  }

  private genreFilter(genres) {
    let self = this;

    return genres.some(function (item) {
      let genre = item.genre;
      return self.genres.some( function (item) {
        return (item.name === genre && item.selected === true);
      });
    });
  }

  private myShowsFilter(season) {
    let self = this;
    return season.some(function (item: Season) {
      return !(!item.selected && self.myShows);
    });
  }

  static filterChanged(array) {
    let result = array.reduce( function(prev, next) {
      prev[next.selected] = (prev[next.selected] + 1) || 1;
      return prev;
    },{});

    return ('true' in result && 'false' in result);
  }
}
