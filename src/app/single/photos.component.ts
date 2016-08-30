import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SingleAPIService } from './single-api.service';
import { APIPhotosComponent } from '../shared/api.interface';
import { Photo } from '../shared/photo.interface';

@Component({
  selector: 'app-single-photos',
  template: `
    <app-photos (onMore)="onMore()">
      <md-grid-list cols="3" rowHeight="390px" gutterSize="30px">
        <md-grid-tile *ngFor="let photo of photos">
          <app-single-photo [photoId]="photo.id"></app-single-photo>
        </md-grid-tile>
      </md-grid-list>
    </app-photos>
  `
})
export class SinglePhotosComponent implements OnInit, OnDestroy, APIPhotosComponent {
  offset: number = 0;
  limit: number = 3;
  photos: Photo[];
  feedSub: Subscription;

  constructor(
    private api: SingleAPIService
  ) { }

  ngOnInit() {
    this.feedSub = this.api.feed(this.offset, this.limit).subscribe(feed => {
      this.photos = feed;
    });
  }

  onMore() {
    this.offset += this.limit;

    this.feedSub.unsubscribe();
    this.feedSub = this.api.feed(this.offset, this.limit).subscribe(photos => {
      if (photos.length) {
        photos.forEach(photo => {
          this.photos.push(photo);
        });
      }
    });
  }

  ngOnDestroy() {
    this.feedSub.unsubscribe();
  }
}
