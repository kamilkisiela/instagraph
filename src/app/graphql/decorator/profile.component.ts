import { Component } from '@angular/core';
import { Apollo, ApolloQuery } from 'angular2-apollo';

import { client } from '../../client';
import { User } from '../../shared/user.interface';

import gql from 'graphql-tag';

interface QueryResult extends ApolloQuery {
  me: User;
}

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
    <app-profile [me]="data.me"></app-profile>
  `
})
@Apollo({
  client,
  queries: () => ({
    data: {
      query: MeQuery,
    },
  }),
})
export class GraphqlProfileComponent {
  data: QueryResult;
}
