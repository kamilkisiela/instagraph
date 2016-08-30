import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MultipleAPIService } from './multiple-api.service';
import { APIPhotosComponent } from '../shared/api.interface';
import { Photo } from '../shared/photo.interface';
import { PhotoLikeEvent } from '../photos/photos.component';

@Component({
  selector: 'app-multiple-photos',
  template: `
    <app-photos (onMore)="onMore()">
      <md-grid-list cols="3" rowHeight="390px" gutterSize="30px">
        <md-grid-tile *ngFor="let photo of photos">
          <app-multiple-photo [photoId]="photo.id"></app-multiple-photo>
        </md-grid-tile>
      </md-grid-list>
    </app-photos>
  `
})
export class MultiplePhotosComponent implements OnInit, OnDestroy, APIPhotosComponent {
  offset: number = 0;
  limit: number = 3;
  photos: Photo[];
  feedSub: Subscription;

  constructor(
    private api: MultipleAPIService
  ) { }

  ngOnInit() {
    this.feedSub = this.api.feed(this.offset, this.limit).subscribe(photos => {
      this.photos = photos;
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
