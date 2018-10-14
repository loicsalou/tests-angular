import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgrxComponent} from './ngrx/ngrx.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'ngrx',
        component: NgrxComponent
      }
    ]
  }
];

@NgModule({
            imports: [
              RouterModule.forRoot(routes)
            ],
            exports: [ RouterModule ]
          })
export class AppRoutingModule {
}
