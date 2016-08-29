import { Component, OnInit } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';

import { Photo } from '../shared/photo.interface';

import gql from 'graphql-tag';

const FeedQuery = gql`
  query getFeed {
    feed {
      url
      createdAt
    }
  }
`;

@Component({
  selector: 'app-graphql-photos',
  template: `
    <app-photos [photos]="photos"></app-photos>
  `
})
export class GraphqlPhotosComponent implements OnInit {
  photos: Photo[];

  constructor(
    private apollo: Angular2Apollo
  ) { }

  ngOnInit() {
    this.apollo.watchQuery({ query: FeedQuery}).subscribe(({data}) => {
      this.photos = data.feed;
    });
  }
}
