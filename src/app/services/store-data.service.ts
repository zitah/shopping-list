import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';
import { MOCK_STORES } from '../mockdata/mock-data';
import { startWith, scan } from 'rxjs/operators'
import { Subject } from 'rxjs/internal/Subject';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { reduce } from 'rxjs/internal/operators/reduce';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { IAction } from 'src/app/interfaces/action.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {

  storeData$: Observable<Store[]>; 
  action$ = new Subject<IAction>();
  
  // Initial State
  initState = MOCK_STORES;

  // Higher order function to send actions to the stream

  constructor() {
    this.storeData$ = this.action$.pipe(
      scan<IAction, Store[]>((state, action) => {  
        switch(action.type) {
          case 'ADD_STORE':
            return [
              ...state,
              action.payload
            ];
          default:
            return state;
        }
      }, this.initState),
      startWith(this.initState),
    )
    
    this.storeData$.subscribe((storeData: Store[]) => {
      console.log(storeData);
    });  
  }

  addStore(store: Store) {
    this.action$.next({
      type: 'ADD_STORE',
      payload: store
    });
  }
}