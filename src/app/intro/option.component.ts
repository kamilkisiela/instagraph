import { Component, Input } from '@angular/core';

export interface IntroOption {
  title: string;
  subtitle: string;
  content?: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-intro-option',
  styleUrls: ['option.component.scss'],
  template: `
    <md-card>
      <md-card-title-group>
          <md-icon md-card-sm-image class="big">{{option.icon}}</md-icon>
          <md-card-title>{{option.title}}</md-card-title>
          <md-card-subtitle>{{option.subtitle}}</md-card-subtitle>
      </md-card-title-group>
      <md-card-content *ngIf="option.content">
        {{option.content}}
      </md-card-content>
      <md-card-actions>
        <button md-button color="primary" [routerLink]="option.link" [disableRipple]="true">SELECT</button>
      </md-card-actions>
    </md-card>
  `
})
export class IntroOptionComponent {
  @Input() option: IntroOption;
}