import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule }from '@angular/router';
import { MdCoreModule } from '@angular2-material/core';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdIconModule } from '@angular2-material/icon';
import { MdTooltipModule } from '@angular2-material/tooltip';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { routes } from './routes';
import { GraphqlComponent } from './graphql/graphql.component';
import { SingleComponent } from './single/single.component';
import { MultipleComponent } from './multiple/multiple.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoComponent } from './photos/photo.component';
import { LoadingComponent } from './loading/loading.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    GraphqlComponent,
    SingleComponent,
    MultipleComponent,
    PhotosComponent,
    LoadingComponent,
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
    MdCoreModule,
    MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdToolbarModule,
    MdIconModule,
    MdTooltipModule
  ],
  providers: [],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
