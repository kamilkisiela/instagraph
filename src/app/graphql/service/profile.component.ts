import { Component, OnInit, OnDestroy } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../shared/user.interface';

import gql from 'graphql-tag';

@Component({
  selector: 'app-graphql-profile',
  template: `
    <app-profile [me]="me"></app-profile>
  `
})
export class GraphqlProfileComponent implements OnInit, OnDestroy {
  me: User;
  meSub: Subscription;

  constructor(
    private apollo: Angular2Apollo
  ) { }




  ngOnInit() {
    /*
      QUERY
    */

    this.meSub = this.apollo.watchQuery({
      query: gql`
        query getMe {
          me {
            picture
            firstname
            surname
            bio
          }
        }
      `,
    }).subscribe(({data}) => {
      this.me = data.me;
    });
  }

  

  ngOnDestroy() {
    this.meSub.unsubscribe();
  }
}
