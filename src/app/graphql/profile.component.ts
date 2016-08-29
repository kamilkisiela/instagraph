import { Component, OnInit } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';

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
export class GraphqlProfileComponent implements OnInit {
  me: User;

  constructor(
    private apollo: Angular2Apollo
  ) { }

  ngOnInit() {
    this.apollo.watchQuery({ query: MeQuery}).subscribe(({data}) => {
      this.me = data.me;
    });
  }
}
