import { Component, OnInit, OnDestroy } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import { Subscription } from 'rxjs/Subscription';

import { Photo } from '../shared/photo.interface';
import { PhotoLikeEvent } from '../photos/photos.component';

import gql from 'graphql-tag';

const FeedQuery = gql`
  query getFeed {
    feed {
      id
      url
      createdAt
      likes
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
    <app-photos [photos]="photos" (onPhotoLike)="onLike($event)"></app-photos>
  `
})
export class GraphqlPhotosComponent implements OnInit, OnDestroy {
  photos: Photo[];
  feedSub: Subscription;

  constructor(
    private apollo: Angular2Apollo
  ) { }

  ngOnInit() {
    this.feedSub = this.apollo.watchQuery({ query: FeedQuery}).subscribe(({data}) => {
      this.photos = data.feed;
    });
  }

  onLike(event: PhotoLikeEvent) {
    this.apollo.mutate({
      mutation: LikeMutation,
      variables: {
        id: event.id,
        value: event.value,
      },
    }).then(({data}) => {
      if (data) {
        this.photos.forEach(item => {
          if (item.id === event.id) {
            item.likes = data.likePhoto.likes;
            item.liked = data.likePhoto.liked;
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.feedSub.unsubscribe();
  }
}
