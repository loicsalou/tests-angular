import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, S1d1} from '../application.state';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.css']
})
export class NgrxComponent {

  testNgrx = true;

  constructor(private store: Store<AppState>) {}

  toggleNgrx() {
    this.testNgrx = !this.testNgrx;
  }

  updateState() {
    this.store.dispatch(new S1d1('Valeur changée après l\'arrêt du test'));
  }

}
