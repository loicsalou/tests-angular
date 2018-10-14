import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StateReadComponent} from './state-read/state-read.component';
import {StateWriteComponent} from './state-write/state-write.component';
import {META_REDUCERS, ROOT_REDUCERS} from './application.state';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { NgrxComponent } from './ngrx/ngrx.component';
import { HomeComponent } from './home/home.component';

@NgModule({
            declarations: [
              AppComponent,
              StateReadComponent,
              StateWriteComponent,
              NgrxComponent,
              HomeComponent
            ],
            imports: [
              BrowserModule,
              AppRoutingModule,
              FormsModule,
              StoreModule.forRoot(ROOT_REDUCERS, {
                metaReducers: META_REDUCERS
              })
            ],
            providers: [],
            bootstrap: [ AppComponent ]
          })
export class AppModule {
}
