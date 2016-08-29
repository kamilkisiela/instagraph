import { GraphqlComponent } from './graphql.component';
// Service
import { GraphqlProfileComponent as ProfileWithService } from './service/profile.component';
import { GraphqlPhotosComponent as PhotosWithService } from './service/photos.component';
// Decorator
import { GraphqlProfileComponent as ProfileWithDecorator } from './decorator/profile.component';
import { GraphqlPhotosComponent as PhotosWithDecorator } from './decorator/photos.component';

const USING_SERVICE = [
  ProfileWithService,
  PhotosWithService
];

const USING_DECORATOR = [
  ProfileWithDecorator,
  PhotosWithDecorator,
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
