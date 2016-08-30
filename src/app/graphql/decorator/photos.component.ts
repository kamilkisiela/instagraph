import { Component } from '@angular/core';
import { Apollo, ApolloQuery } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

import { client } from '../../client';
import { Photo } from '../../shared/photo.interface';

import gql from 'graphql-tag';

interface QueryResult extends ApolloQuery {
  feed: Photo[];
}

const FeedQuery = gql`
  query getFeed($offset: Int!, $limit: Int!) {
    feed(offset: $offset, limit: $limit) {
      id
    }
  }
`;

@Component({
  selector: 'app-graphql-photos',
  template: `
    <app-photos (onPhotoLike)="onLike($event)" (onMore)="onMore()">
      <md-grid-list *ngIf="data.feed" cols="3" rowHeight="390px" gutterSize="30px">
        <md-grid-tile *ngFor="let photo of data.feed">
          <app-graphql-photo [photoId]="photo.id"></app-graphql-photo>
        </md-grid-tile>
      </md-grid-list>
    </app-photos>
  `
})
@Apollo({
  client,
  queries: (component: GraphqlPhotosComponent) => ({
    data: {
      query: FeedQuery,
      variables: {
        offset: component.offset,
        limit: component.limit,
      },
    },
  })
})
export class GraphqlPhotosComponent {
  offset: number = 0;
  limit: number = 3;
  data: QueryResult;

  onMore() {
    // XXX Temporary fix of `apollostack/angular2-apollo/issues/80`
    // XXX WE HAVE A BUG HERE!!!!
    /*
      this.offset += this.limit;
      this.data['fetchMore']({
      variables: {
        offset: this.offset,
        limit: this.limit,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.data) {
          return prev;
        }

        return Object.assign({}, prev, {
          feed: [...prev.feed, ...fetchMoreResult.data.feed],
        });
      },
    });*/

    // XXX Temporary workaround
    this.limit += 3;
  }
}
