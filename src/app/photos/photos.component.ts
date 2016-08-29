import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: 'photos.component.html',
  styleUrls: ['photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photos: number[];

  constructor() {
    this.photos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  ngOnInit() {
  }

}
