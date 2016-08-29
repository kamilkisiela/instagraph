import { Component, OnInit } from '@angular/core';

import { MultipleAPIService } from './multiple-api.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-multiple-profile',
  template: `
    <app-profile [me]="me"></app-profile>
  `
})
export class MultipleProfileComponent implements OnInit {
  me: User;

  constructor(
    private api: MultipleAPIService
  ) { }

  ngOnInit() {
    this.api.me().subscribe(me => {
      this.me = me;
    });
  }
}
