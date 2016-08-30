import { Component, OnInit, OnDestroy } from '@angular/core';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';
import { Subscription } from 'rxjs/Subscription';

import { Photo } from '../../shared/photo.interface';

import gql from 'graphql-tag';

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
      <md-grid-list cols="3" rowHeight="390px" gutterSize="30px">
        <md-grid-tile *ngFor="let photo of photos">
          <app-graphql-photo [photoId]="photo.id"></app-graphql-photo>
        </md-grid-tile>
      </md-grid-list>
    </app-photos>
  `
})
export class GraphqlPhotosComponent implements OnInit, OnDestroy {
  photos: Photo[];
  offset: number = 0;
  limit: number = 3;
  feedObs: ApolloQueryObservable<ApolloQueryResult>;
  feedSub: Subscription;

  constructor(
    private apollo: Angular2Apollo
  ) { }

  ngOnInit() {
    this.feedObs = this.apollo.watchQuery({
      query: FeedQuery,
      variables: {
        offset: this.offset,
        limit: this.limit,
      },
    });

    this.feedSub = this.feedObs.subscribe(({data}) => {
      this.photos = data.feed;
    });
  }

  onMore() {
    this.offset += this.limit;
    this.feedObs.fetchMore({
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
    });
  }

  ngOnDestroy() {
    this.feedSub.unsubscribe();
  }
}
