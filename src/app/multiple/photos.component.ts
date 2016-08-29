import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MultipleAPIService } from './multiple-api.service';
import { Photo } from '../shared/photo.interface';
import { PhotoLikeEvent } from '../photos/photos.component';

@Component({
  selector: 'app-multiple-photos',
  template: `
    <app-photos [photos]="photos" (onPhotoLike)="onLike($event)"></app-photos>
  `
})
export class MultiplePhotosComponent implements OnInit, OnDestroy {
  photos: Photo[];
  feedSub: Subscription;

  constructor(
    private api: MultipleAPIService
  ) { }

  ngOnInit() {
    this.feedSub = this.api.feed().subscribe(photos => {
      this.photos = photos;
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
