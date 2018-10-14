import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState, AppStateQuery, S1d1, S1d2, S2d1, S2d2, SetAllAction} from '../application.state';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
             selector: 'app-state-write',
             templateUrl: './state-write.component.html',
             styleUrls: [ './state-write.component.css' ]
           })
export class StateWriteComponent implements OnInit, OnDestroy {

  s1d1: string;
  s1d2: string;
  s2d1: string;
  s2d2: string;

  private destroy$ = new Subject();

  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.store.pipe(
      select(AppStateQuery.getState1Data1),
      tap(data => {
        console.log('reçu state1 data1=' + data);
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (data: string) => this.s1d1 = data
    );
    this.store.pipe(
      select(AppStateQuery.getState1Data2),
      tap(data => {
        console.log('reçu state1 data2=' + data);
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (data: string) => this.s1d2 = data
    );
    this.store.pipe(
      select(AppStateQuery.getState2Data1),
      tap(data => {
        console.log('reçu state2 data1=' + data);
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (data: string) => this.s2d1 = data
    );
    this.store.pipe(
      select(AppStateQuery.getState2Data2),
      tap(data => {
        console.log('reçu state2 data2=' + data);
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (data: string) => this.s2d2 = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next('terminé');
  }

  sendAll() {
    this.store.dispatch(new SetAllAction(this.s1d1, this.s1d2, this.s2d1, this.s2d2));
  }

  sendS1d1() {
    this.store.dispatch(new S1d1(this.s1d1));
  }

  sendS1d2() {
    this.store.dispatch(new S1d2(this.s1d2));
  }

  sendS2d1() {
    this.store.dispatch(new S2d1(this.s2d1));
  }

  sendS2d2() {
    this.store.dispatch(new S2d2(this.s2d2));
  }
}
