import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShowsService }                         from "../../service/shows.service";

@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.scss']
})
export class ContentComponent implements OnInit {

  private shows;
  private genres;
  private filteredShows;
  private showStatus;

  constructor(private showsService: ShowsService, private ref: ChangeDetectorRef) {
    this.showStatus =  [
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
      this.filterShowsOnStatus();
    });
  }

  getGenres(): void {
    this.showsService.getGerres().then(genres => {
      this.genres = genres;
    })
  }

  inViewport(event, show): void {
    if (event.value) {
      show.display_card = true;
    } else {
      show.display_card = false;
    }
    this.ref.detectChanges();
  }

  cseasonClicked(show, season): void {
    season.selected = !season.selected;
    this.showsService.updateShow(show);
    this.ref.detectChanges();
  }

  tabSelected(tab, show): void {
    show.display_overview = (tab === 'overview');
    this.ref.detectChanges();
  }

  showStatusClicked( status ): void {
    status.selected = !status.selected;
    this.filterShowsOnStatus();
  }

  private filterShowsOnStatus (): void {
    var self = this;

    this.filteredShows = this.shows.filter(function (item) {
      var status = item.status;
      return self.showStatus.some(function (item) {
        return (item.name === status && item.selected === true);
      })
    });

    // console.info(this.filteredShows.length)
  }
}
