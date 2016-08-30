import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Photo } from '../shared/photo.interface';

export interface PhotoLikeEvent {
  id: number;
  value: boolean;
}

@Component({
  selector: 'app-photos',
  template: `
    <ng-content *ngIf="!photos"></ng-content>
    <md-grid-list *ngIf="photos" cols="3" rowHeight="390px" gutterSize="30px">
      <md-grid-tile *ngFor="let photo of photos">
        <app-photo [photo]="photo" (onLike)="onLike($event, photo.id)"></app-photo>
      </md-grid-tile>
    </md-grid-list>
    <div class="load-more">
      <button md-raised-button color="primary" (click)="more()" [disableRipple]="true">load more</button>
    </div>
  `,
  styleUrls: ['photos.component.scss']
})
export class PhotosComponent {
  @Input() photos: Photo[];
  @Output() onPhotoLike: EventEmitter<PhotoLikeEvent> = new EventEmitter<PhotoLikeEvent>();
  @Output() onMore: EventEmitter<void> = new EventEmitter<void>();

  onLike(value: boolean, id: number) {
    this.onPhotoLike.emit({
      id,
      value,
    });
  }

  more() {
    this.onMore.emit();
  }
}
