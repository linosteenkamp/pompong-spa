import { Component, Inject, OnInit} from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-invalid-password',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  title: string;
  message: string;

  constructor(@Inject(MD_DIALOG_DATA) private data: any) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

}
