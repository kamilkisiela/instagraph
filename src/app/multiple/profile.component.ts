import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MultipleAPIService } from './multiple-api.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-multiple-profile',
  template: `
    <app-profile [me]="me"></app-profile>
  `
})
export class MultipleProfileComponent implements OnInit, OnDestroy {
  me: User;
  meSub: Subscription;

  constructor(
    private api: MultipleAPIService
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
