import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <md-toolbar color="primary">
      <md-icon>monochrome_photos</md-icon>
      <a routerLink="/" class="home">InstaGraph</a>

      <span class="fill-remaining-space"></span>

      <app-navigation></app-navigation>
    </md-toolbar>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}
