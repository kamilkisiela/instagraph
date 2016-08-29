import { Component, Input } from '@angular/core';

import { User } from '../shared/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent {
  @Input() me: User;
}
