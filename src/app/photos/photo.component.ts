import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Photo } from '../shared/photo.interface';

@Component({
  selector: 'app-photo',
  template: `
    <md-card *ngIf="photo">
      <img md-card-image [src]="photo.url" (dblclick)="like()">
      <md-card-content>
        <div>
          <span>
            <md-icon>event</md-icon>
            <span> {{photo.createdAt | date}} </span>
          </span>
          <span class="likes">
            ({{photo.likes}}) 
            <button md-icon-button class="like-button" (click)="like()" [class.liked]="photo.liked" [disableRipple]="true">
              <md-icon>plus_one</md-icon>
            </button>
          </span>
        </div>
      </md-card-content>
    </md-card>
  `,
  styleUrls: ['photo.component.scss']
})
export class PhotoComponent {
  @Input() photo: Photo;
  @Output() onLike: EventEmitter<boolean> = new EventEmitter<boolean>();

  like() {
    this.photo.liked = !this.photo.liked;
    this.onLike.emit(this.photo.liked);
  }
}
