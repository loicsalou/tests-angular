import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState, AppStateQuery} from '../application.state';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
             selector: 'app-state-read',
             templateUrl: './state-read.component.html',
             styleUrls: [ './state-read.component.css' ]
           })
export class StateReadComponent implements OnInit, OnDestroy {

  state$: Observable<AppState>;
  private destroy$ = new Subject();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.state$ = this.store.pipe(
      select(AppStateQuery.getAppState),
      tap(state => {
        console.log('reçu state: ' + JSON.stringify(state));
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    this.destroy$.next('terminé');
  }

}
