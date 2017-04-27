import {Injectable} from '@angular/core';
import {Show} from '../interfaces/show';
import {Season} from '../interfaces/season';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FileSizeInfoService {
  public totalSize: number;
  public selectedSize: number;
  private subject = new Subject();


  constructor() {
    this.totalSize = 0;
    this.selectedSize = 0;
  }

  public getMessage() {
    return this.subject.asObservable();
  }

  public update(season: Season, show: Show) {
    if (season.selected) {
      show.selected_file_size += +season.file_size;
      this.selectedSize += +season.file_size;
    } else {
      show.selected_file_size -= +season.file_size;
      this.selectedSize -= +season.file_size;
    }

    this.subject.next();
  }
}
