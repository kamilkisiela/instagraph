import { Component, Input, OnInit } from '@angular/core';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';

import gql from 'graphql-tag';

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
    <app-photo [photo]="data | async | select: 'photo'" (onLike)="like(photoId, $event)"></app-photo>
  `
})
export class GraphqlPhotoComponent implements OnInit {
  @Input() photoId: number;
  data: ApolloQueryObservable<ApolloQueryResult>;

  constructor(
    private  apollo: Angular2Apollo
  ) { }

  ngOnInit() {
    this.data = this.apollo.watchQuery({
      query: PhotoQuery,
      variables: {
        id: this.photoId,
      },
    });
  }

  like(id: number, value: boolean) {
    this.apollo.mutate({
      mutation: LikeMutation,
      variables: {
        id,
        value,
      },
      updateQueries: {
        getPhoto: (previousQueryResult, { mutationResult, queryVariables }) => {
          if (queryVariables.id !== this.photoId) {
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
    });
  }
}
