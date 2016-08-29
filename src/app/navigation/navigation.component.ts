import { Component } from '@angular/core';

import { dataSources } from '../shared/data-sources';

interface Options {
  link: string;
  icon: string;
}

@Component({
  selector: 'app-navigation',
  styleUrls: ['navigation.component.scss'],
  template: `
    <button *ngFor="let option of options" md-icon-button
      [routerLink]="option.link" routerLinkActive="active"
      [disableRipple]="true" 
      class="data-source"> 
      <md-icon>{{option.icon}}</md-icon>
    </button>

    <a href="http://localhost:4300/graphiql" target="_BLANK" class="graphiql">
      GraphiQL
    </a>
  `
})
export class NavigationComponent {
  options: Options[];

  constructor() {
    this.options = dataSources;
  }
}
