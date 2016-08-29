import { Component } from '@angular/core';

@Component({
  selector: 'app-multiple',
  template: `
    <div id="wrapper">
      <app-multiple-profile></app-multiple-profile>
      <app-multiple-photos></app-multiple-photos>
    </div>
  `
})
export class MultipleComponent {}
