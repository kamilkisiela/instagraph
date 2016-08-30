import { MultipleAPIService } from './multiple-api.service';
import { MultipleComponent } from './multiple.component';
import { MultiplePhotosComponent } from './photos.component';
import { MultiplePhotoComponent } from './photo.component';
import { MultipleProfileComponent } from './profile.component';

export const MULTIPLE_PROVIDERS = [
  MultipleAPIService
];

export const MULTIPLE_DECLARATIONS = [
  MultipleComponent,
  MultiplePhotosComponent,
  MultiplePhotoComponent,
  MultipleProfileComponent
];
