import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SingleAPIService } from './single-api.service';
import { Photo } from '../shared/photo.interface';
import { PhotoLikeEvent } from '../photos/photos.component';

@Component({
  selector: 'app-single-photos',
  template: `
    <app-photos [photos]="photos" (onPhotoLike)="onLike($event)"></app-photos>
  `
})
export class SinglePhotosComponent implements OnInit, OnDestroy {
  photos: Photo[];
  feedSub: Subscription;

  constructor(
    private api: SingleAPIService
  ) { }

  ngOnInit() {
    this.feedSub = this.api.feed().subscribe(feed => {
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

  ngOnDestroy() {
    this.feedSub.unsubscribe();
  }
}
