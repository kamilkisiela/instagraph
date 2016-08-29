import { Component } from '@angular/core';
import { Apollo, ApolloQuery } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

import { client } from '../../client';
import { Photo } from '../../shared/photo.interface';
import { PhotoLikeEvent } from '../../photos/photos.component';

import gql from 'graphql-tag';

interface QueryResult extends ApolloQuery {
  feed: Photo[];
}

const FeedQuery = gql`
  query getFeed($offset: Int!, $limit: Int!) {
    feed(offset: $offset, limit: $limit) {
      id
      url
      createdAt
      likes
      liked
    }
  }
`;

const LikeMutation = gql`
  mutation like($id: Int!, $value: Boolean!) {
    likePhoto(id: $id, value: $value) {
      likes
      liked
    }
  }
`;

@Component({
  selector: 'app-graphql-photos',
  template: `
    <app-photos [photos]="data.feed" (onPhotoLike)="onLike($event)" (onMore)="onMore()"></app-photos>
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
  }),
  mutations: () => ({
    likePhoto: (id: number, value: boolean) => ({
      mutation: LikeMutation,
      variables: {
        id,
        value,
      },
      updateQueries: {
        getFeed: (previousQueryResult, { mutationResult }) => {
          const currentFeed = previousQueryResult.feed;
          const newFeed = currentFeed.map(photo => {
            if (photo.id === id) {
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
    }),
  }),
})
export class GraphqlPhotosComponent {
  offset: number = 0;
  limit: number = 3;
  data: QueryResult;
  likePhoto: (id: number, value: boolean) => Promise<ApolloQueryResult>;

  onLike(event: PhotoLikeEvent) {
    this.likePhoto(event.id, event.value);
  }

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
