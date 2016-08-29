import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SingleAPIService } from './single-api.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-single-profile',
  template: `
    <app-profile [me]="me"></app-profile>
  `
})
export class SingleProfileComponent implements OnInit, OnDestroy {
  me: User;
  meSub: Subscription;

  constructor(
    private api: SingleAPIService
  ) { }

  ngOnInit() {
    this.meSub = this.api.me().subscribe(me => {
      this.me = me;
    });
  }

  ngOnDestroy() {
    this.meSub.unsubscribe();
  }
}