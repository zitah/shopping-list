import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { MOCK_ITEMS } from '../mockdata/mock-data';
import { startWith, scan } from 'rxjs/operators'
import { Subject } from 'rxjs/internal/Subject';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { reduce } from 'rxjs/internal/operators/reduce';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { IAction } from 'src/app/interfaces/action.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemDataService {

  itemData$: Observable<Item[]>; 
  action$ = new Subject<IAction>();
  
  // Initial State
  initState = MOCK_ITEMS;
    
  // Higher order function to send actions to the stream

  constructor() {
    this.itemData$ = this.action$.pipe(
      scan<IAction, Item[]>((state, action) => {  
        switch(action.type) {
          case 'ADD_ITEM':
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

    this.itemData$.subscribe((itemData: Item[]) => {
      console.log(itemData);
    });    
  }

  addItem(item: Item) {
    this.action$.next({
      type: 'ADD_ITEM',
      payload: item
    });
  }
}