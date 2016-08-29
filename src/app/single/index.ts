import { SingleAPIService } from './single-api.service';
import { SingleComponent } from './single.component';
import { SingleProfileComponent } from './profile.component';
import { SinglePhotosComponent } from './photos.component';

export const SINGLE_PROVIDERS = [
  SingleAPIService
];

export const SINGLE_DECLARATIONS = [
  SingleComponent,
  SingleProfileComponent,
  SinglePhotosComponent
];
