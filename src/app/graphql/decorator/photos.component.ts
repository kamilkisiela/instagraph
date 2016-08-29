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
  query getFeed {
    feed {
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
    <app-photos [photos]="data.feed" (onPhotoLike)="onLike($event)"></app-photos>
  `
})
@Apollo({
  client,
  queries: () => ({
    data: {
      query: FeedQuery,
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
  data: QueryResult;
  likePhoto: (id: number, value: boolean) => Promise<ApolloQueryResult>;

  onLike(event: PhotoLikeEvent) {
    this.likePhoto(event.id, event.value);
  }
}
