import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {FileSizeInfoService} from './service/file-size-info.service';
import {environment} from '../environments/environment';
import {ShowsService} from './service/shows.service';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  title = 'Pompong';
  subscription: Subscription;
  service_url = environment.service_url;

  constructor(
    public fileSizeInfo: FileSizeInfoService,
    public authService: AuthService,
    private showsService: ShowsService,
    private ref: ChangeDetectorRef
  ) {
    this.subscription = this.fileSizeInfo.getMessage().subscribe(() => this.ref.detectChanges());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  downloadRsyncFile() {
    this.showsService.getRsyncFile().then(data => {
      const url = this.service_url + data['file_name'];
      ShowsService.downloadFile(url);
    });
  }
}
