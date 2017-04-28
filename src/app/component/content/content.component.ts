import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {FileSizeInfoService} from '../../service/file-size-info.service';
import {ShowsFilterService} from '../../service/shows-filter.service';
import {ShowsService} from '../../service/shows.service';
import {Season} from '../../interfaces/season';
import {Show} from '../../interfaces/show';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.scss']
})
export class ContentComponent implements OnInit {
  public url = environment.service_url;

  public shows;
  public filteredShows;
  public myShows = false;

  public genres;
  public genresSelected = true;
  public genresIndeterminate = false;

  public statuses;
  public statusSelected = true;
  public statusIndeterminate = false;

  static isIndeterminate(array) {
    const result = array.reduce( function(prev, next) {
      prev[next.selected] = (prev[next.selected] + 1) || 1;
      return prev;
    }, {});

    return ('true' in result && 'false' in result);
  }

  constructor(
    private showsService: ShowsService,
    private showsFilter: ShowsFilterService,
    private fileSizeInfo: FileSizeInfoService,
    private ref: ChangeDetectorRef
  ) {
    this.statuses =  [
      { 'name': 'Continuing', 'selected': true },
      { 'name': 'Ended', 'selected': true },
    ];
  }

  ngOnInit() {
    this.getShows();
    this.getGenres();
  }

  getShows(): void {
    this.showsService.getShows().then(shows => {
      this.shows = shows;
      this.filteredShows = this.showsFilter.filter(this.shows, this.myShows, this.statuses, this.genres);
    });
  }

  getGenres(): void {
    this.showsService.getGenres().then(genres => {
      this.genres = genres;
    });
  }

  inViewport(event, show: Show): void {
    show.display_card = event.value;
    this.ref.detectChanges();
  }

  tabSelected(tab: string, show: Show): void {
    show.display_overview = (tab === 'overview');
    this.ref.detectChanges();
  }

  seasonClicked(show: Show, season: Season): void {
    season.selected = !season.selected;

    this.fileSizeInfo.update(season, show);
    this.showsService.updateShow(show).subscribe();
    this.ref.detectChanges();
  }

  allSeasonChecked(show: Show) {
    show.seasons_indeterminate = ContentComponent.isIndeterminate(show.seasons);
    if (!show.seasons_indeterminate) {
      return show.seasons[0].selected;
    }
  }

  allSeasonClicked(show: Show) {
    const checked = show.seasons_indeterminate ? true : !show.seasons[0].selected;
    show.seasons.forEach(season => {
      if (!season.selected === checked) {
        season.selected = checked;
        this.fileSizeInfo.update(season, show);
      }
    });

    show.seasons_indeterminate = false;
    this.showsService.updateShow(show).subscribe();
    this.ref.detectChanges();
  }

  myShowsClicked(): void {
    this.myShows = !this.myShows;
    this.filteredShows = this.showsFilter.filter(this.shows, this.myShows, this.statuses, this.genres);
  }

  allGenresClicked(): void {
    this.genresSelected = !this.genresSelected;
    this.genres.forEach(item => item.selected = this.genresSelected);
    this.genresIndeterminate = false;
    this.filteredShows = this.showsFilter.filter(this.shows, this.myShows, this.statuses, this.genres);
  }

  allStatusClicked(): void {
    this.statusSelected = !this.statusSelected;
    this.statuses.forEach(item => item.selected = this.statusSelected);
    this.statusIndeterminate = false;
    this.filteredShows = this.showsFilter.filter(this.shows, this.myShows, this.statuses, this.genres);
  }

  filterClicked( status ): void {
    status.selected = !status.selected;

    this.genresIndeterminate = ContentComponent.isIndeterminate(this.genres);
    if (!this.genresIndeterminate) {
      this.genresSelected = this.genres[0].selected;
    }

    this.statusIndeterminate = ContentComponent.isIndeterminate(this.statuses);
    if (!this.statusIndeterminate) {
      this.statusSelected = this.statuses[0].selected;
    }

    this.filteredShows = this.showsFilter.filter(this.shows, this.myShows, this.statuses, this.genres);
  }
}
