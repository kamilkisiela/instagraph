import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule }from '@angular/router';
import { MdCoreModule } from '@angular2-material/core';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdIconModule } from '@angular2-material/icon';
import { ApolloModule } from 'angular2-apollo';

import { AppComponent } from './app.component';
import { INTRO_DECLARATIONS } from './intro';
import { routes } from './routes';
import { client } from './client';
// GraphQL
import { graphqlDeclarations } from './graphql';
// Single
import { SINGLE_PROVIDERS, SINGLE_DECLARATIONS } from './single';
// Multiple
import { MULTIPLE_PROVIDERS, MULTIPLE_DECLARATIONS } from './multiple';
// Other
import { NavigationComponent } from './navigation/navigation.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoComponent } from './photos/photo.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    // GraphQL
    ...graphqlDeclarations('decorator'),
    // Single
    ...SINGLE_DECLARATIONS,
    // Multiple
    ...MULTIPLE_DECLARATIONS,
    // Other
    ...INTRO_DECLARATIONS,
    NavigationComponent,
    PhotosComponent,
    ProfileComponent,
    PhotoComponent
  ],
  imports: [
    // @angular
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    // @angular2-material
    MdCoreModule.forRoot(),
    MdButtonModule.forRoot(),
    MdCardModule.forRoot(),
    MdGridListModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdIconModule.forRoot(),
    // GraphQL
    ApolloModule.withClient(client),
  ],
  providers: [
    ...MULTIPLE_PROVIDERS,
    ...SINGLE_PROVIDERS
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
