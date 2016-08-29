import { Component, OnInit, Input } from '@angular/core';

import { Photo } from '../shared/photo.interface';

@Component({
  selector: 'app-photo',
  template: `
    <md-card *ngIf="photo">
      <img md-card-image [src]="photo.url">
      <md-card-content>
          <p>{{photo.createdAt | date}}</p>
      </md-card-content>
    </md-card>
  `,
  styleUrls: ['photo.component.scss']
})
export class PhotoComponent {
  @Input() photo: Photo;
}
