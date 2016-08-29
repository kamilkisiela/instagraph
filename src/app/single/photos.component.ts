import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SingleAPIService } from './single-api.service';
import { APIPhotosComponent } from '../shared/api.interface';
import { Photo } from '../shared/photo.interface';
import { PhotoLikeEvent } from '../photos/photos.component';

@Component({
  selector: 'app-single-photos',
  template: `
    <app-photos [photos]="photos" (onPhotoLike)="onLike($event)" (onMore)="onMore()"></app-photos>
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

  onLike(event: PhotoLikeEvent) {
    this.api.like(event.id, event.value).then(photo => {
      if (photo) {
        this.photos.forEach(item => {
          if (item.id === photo.id) {
            item.likes = photo.likes;
            item.liked = photo.liked;
          }
        });
      }
    });
  }

  onMore() {
    this.offset += this.limit;
    this.api.feed(this.offset, this.limit).subscribe(photos => {
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
