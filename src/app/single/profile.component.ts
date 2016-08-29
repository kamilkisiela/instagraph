import { Component, OnInit } from '@angular/core';

import { SingleAPIService } from './single-api.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-single-profile',
  template: `
    <app-profile [me]="me"></app-profile>
  `
})
export class SingleProfileComponent implements OnInit {
  me: User;

  constructor(
    private api: SingleAPIService
  ) { }

  ngOnInit() {
    this.api.me().subscribe(me => {
      this.me = me;
    });
  }
}