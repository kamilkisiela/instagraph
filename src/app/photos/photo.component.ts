import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: 'photo.component.html',
  styleUrls: ['photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input() photoId: number;
  photoUrl: string;

  constructor() { }

  ngOnInit() {
    this.photoUrl = `assets/${this.photoId}.jpg`;
  }

}
