import { Component, Input } from '@angular/core';

import { Photo } from '../shared/photo.interface';

@Component({
  selector: 'app-photos',
  template: `
    <md-grid-list *ngIf="photos" cols="3" rowHeight="350px" gutterSize="30px">
      <md-grid-tile *ngFor="let photo of photos">
        <app-photo [photo]="photo"></app-photo>
      </md-grid-tile>
    </md-grid-list>

    <div class="load-more" *ngIf="photos">
      <button md-raised-button color="primary">load more</button>
    </div>
  `,
  styleUrls: ['photos.component.scss']
})
export class PhotosComponent {
  @Input() photos: Photo[];
}
