import { Component, OnInit, OnDestroy } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../shared/user.interface';

import gql from 'graphql-tag';

const MeQuery = gql`
  query getMe {
    me {
      picture
      firstname
      surname
      bio
    }
  }
`;

@Component({
  selector: 'app-graphql-profile',
  template: `
    <app-profile [me]="me"></app-profile>
  `
})
export class GraphqlProfileComponent implements OnInit, OnDestroy {
  me: User;
  meSub: Subscription;

  constructor(
    private apollo: Angular2Apollo
  ) { }

  ngOnInit() {
    this.meSub = this.apollo.watchQuery({ query: MeQuery}).subscribe(({data}) => {
      this.me = data.me;
    });
  }

  ngOnDestroy() {
    this.meSub.unsubscribe();
  }
}
