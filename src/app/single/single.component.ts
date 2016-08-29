import { Component } from '@angular/core';

@Component({
  selector: 'app-single',
  template: `
    <div id="wrapper">
      <app-single-profile></app-single-profile>
      <app-single-photos></app-single-photos>
    </div>
  `
})
export class SingleComponent {}
