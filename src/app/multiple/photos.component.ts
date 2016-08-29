import { Component, OnInit } from '@angular/core';

import { MultipleAPIService } from './multiple-api.service';
import { Photo } from '../shared/photo.interface';

@Component({
  selector: 'app-multiple-photos',
  template: `
    <app-photos [photos]="photos"></app-photos>
  `
})
export class MultiplePhotosComponent implements OnInit {
  photos: Photo[];

  constructor(
    private api: MultipleAPIService
  ) { }

  ngOnInit() {
    this.api.feed().subscribe(photos => {
      this.photos = photos;
    });
  }
}
