import { Routes } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
// data sources
import { SingleComponent } from './single/single.component';
import { MultipleComponent } from './multiple/multiple.component';
import { GraphqlComponent } from './graphql/graphql.component';

export const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'single', component: SingleComponent },
  { path: 'multiple', component: MultipleComponent },
  { path: 'graphql', component: GraphqlComponent },
];
