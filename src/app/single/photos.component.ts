import { Component, OnInit } from '@angular/core';

import { SingleAPIService } from './single-api.service';
import { Photo } from '../shared/photo.interface';

@Component({
  selector: 'app-single-photos',
  template: `
    <app-photos [photos]="photos"></app-photos>
  `
})
export class SinglePhotosComponent implements OnInit {
  photos: Photo[];

  constructor(
    private api: SingleAPIService
  ) { }

  ngOnInit() {
    this.api.feed().subscribe(feed => {
      this.photos = feed;
    });
  }
}