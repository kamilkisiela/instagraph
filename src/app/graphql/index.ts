import { GraphqlComponent } from './graphql.component';
// Service
import { GraphqlProfileComponent as ProfileWithService } from './service/profile.component';
import { GraphqlPhotosComponent as PhotosWithService } from './service/photos.component';
import { GraphqlPhotoComponent as PhotoWithService } from './service/photo.component';
// Decorator
import { GraphqlProfileComponent as ProfileWithDecorator } from './decorator/profile.component';
import { GraphqlPhotosComponent as PhotosWithDecorator } from './decorator/photos.component';
import { GraphqlPhotoComponent as PhotoWithDecorator } from './decorator/photo.component';

const USING_SERVICE = [
  ProfileWithService,
  PhotosWithService,
  PhotoWithService,
];

const USING_DECORATOR = [
  ProfileWithDecorator,
  PhotosWithDecorator,
  PhotoWithDecorator,
];

export const GRAPHQL_DECLARATIONS = [
  GraphqlComponent
];

export function graphqlDeclarations(option: string): any[] {
  const declarations = {
    service: [
      ...GRAPHQL_DECLARATIONS,
      ...USING_SERVICE
    ],
    decorator: [
      ...GRAPHQL_DECLARATIONS,
      ...USING_DECORATOR
    ]
  };

  return declarations[option];
}
