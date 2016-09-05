import { Component, OnInit, OnDestroy } from '@angular/core';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';
import { Subscription } from 'rxjs/Subscription';

import { Photo } from '../../shared/photo.interface';
import { PhotoLikeEvent } from '../../photos/photos.component';

import gql from 'graphql-tag';

@Component({
  selector: 'app-graphql-photos',
  template: `
    <app-photos [photos]="photos" (onPhotoLike)="onLike($event)" (onMore)="onMore()"></app-photos>
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


    /*
      QUERY
    */
    this.feedObs = this.apollo.watchQuery({
      query: gql`
        query getFeed($offset: Int!, $limit: Int!) {
          feed(offset: $offset, limit: $limit) {
            id
            url
            createdAt
            likes
            liked
          }
        }
      `,
      variables: {
        offset: this.offset,
        limit: this.limit,
      },
    });




    this.feedSub = this.feedObs.subscribe(({data}) => {
      this.photos = data.feed;
    });
  }




  onLike(event: PhotoLikeEvent) {
    /*
      MUTATION
    */
    this.apollo.mutate({
      mutation: gql`
        mutation like($id: Int!, $value: Boolean!) {
          likePhoto(id: $id, value: $value) {
            likes
            liked
          }
        }
      `,
      variables: {
        id: event.id,
        value: event.value,
      },




      updateQueries: {
        getFeed: (previousQueryResult, { mutationResult }) => {
          const currentFeed = previousQueryResult.feed;
          const newFeed = currentFeed.map(photo => {
            if (photo.id === event.id) {
              photo.likes = mutationResult.data.likePhoto.likes;
              photo.liked = mutationResult.data.likePhoto.liked;
            }

            return photo;
          });

          return {
            feed: newFeed,
          };
        },
      },
    })
      .then(result => {
        console.log('Liked photo', result.data.likePhoto);
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
