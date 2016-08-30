import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MultipleAPIService } from './multiple-api.service';
import { Photo } from '../shared/photo.interface';

@Component({
  selector: 'app-multiple-photo',
  template: `
    <app-photo [photo]="photo" (onLike)="like(photoId, $event)"></app-photo>
  `
})
export class MultiplePhotoComponent implements OnInit, OnDestroy {
  @Input() photoId: number;
  photo: Photo;
  photoSub: Subscription;

  constructor(
    private api: MultipleAPIService
  ) {}

  like(id: number, value: boolean) {
    this.api.like(id, value).then(photo => {
      if (photo) {
        this.photo.likes = photo.likes;
        this.photo.liked = photo.liked;
      }
    });
  }

  ngOnInit() {
    this.photoSub = this.api.photo(this.photoId).subscribe(photo => {
      this.photo = photo;
    });
  }

  ngOnDestroy() {
    this.photoSub.unsubscribe();
  }
}
