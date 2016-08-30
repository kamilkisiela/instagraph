import { Component, Input } from '@angular/core';
import { Apollo, ApolloQuery } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

import { client } from '../../client';
import { Photo } from '../../shared/photo.interface';

import gql from 'graphql-tag';

interface QueryResult extends ApolloQuery {
  photo: Photo;
}

const PhotoQuery = gql`
  query getPhoto($id: Int!) {
    photo(id: $id) {
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
  selector: 'app-graphql-photo',
  template: `
    <app-photo [photo]="data.photo" (onLike)="like(photoId, $event)"></app-photo>
  `
})
@Apollo({
  client,
  queries: (component: GraphqlPhotoComponent) => ({
    data: {
      query: PhotoQuery,
      variables: {
        id: component.photoId,
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
        getPhoto: (previousQueryResult, { mutationResult, queryVariables }) => {
          if (queryVariables.id !== id) {
            return previousQueryResult;
          }

          const photo = previousQueryResult.photo;

          photo.likes = mutationResult.data.likePhoto.likes;
          photo.liked = mutationResult.data.likePhoto.liked;

          return {
            photo,
          };
        },
      },
    }),
  }),
})
export class GraphqlPhotoComponent {
  @Input() photoId: number;
  data: QueryResult;
  likePhoto: (id: number, value: boolean) => Promise<ApolloQueryResult>;

  like(id: number, value: boolean) {
    this.likePhoto(id, value);
  }
}
