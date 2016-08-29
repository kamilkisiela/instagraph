import { Component } from '@angular/core';

import { IntroOption } from './option.component';
import { dataSources } from '../shared/data-sources';

@Component({
  selector: 'app-intro',
  styleUrls: ['intro.component.scss'],
  template: `
    <div class="row-space-around">
      <app-intro-option *ngFor="let option of options" [option]="option">
      </app-intro-option>
    </div>
  `
})
export class IntroComponent {
  options: IntroOption[];

  constructor() {
    this.options = dataSources;
  }
}
