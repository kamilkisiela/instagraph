import { Component } from '@angular/core';

@Component({
  selector: 'app-graphql',
  template: `
    <div id="wrapper">
      <app-graphql-profile></app-graphql-profile>
      <app-graphql-photos></app-graphql-photos>
    </div>
  `
})
export class GraphqlComponent {}
