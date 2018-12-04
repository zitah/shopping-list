import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { MOCK_ITEMS } from '../mockdata/mock-data';
import { startWith, scan, filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
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
        switch (action.type) {
          case 'ADD_ITEM':
            return [
              ...state,
              action.payload
            ];
          case 'DELETE_ITEM':
            return [
              ...state
            ].filter(item => (item.name !== action.payload.name) || (item.storeId !== action.payload.storeId));
          default:
            return state;
        }
      }, this.initState),
      startWith(this.initState),
    );

    this.itemData$.subscribe((itemData: Item[]) => { });
  }

  addItem(item: Item) {
    this.action$.next({
      type: 'ADD_ITEM',
      payload: item
    });
  }

  getStoreItems(store: string): Observable<Item[]> {
    return this.itemData$.pipe(
      map(items => items.filter(item => item.storeId === store)));
  }

  deleteItem(item: Item) {
    this.action$.next({
      type: 'DELETE_ITEM',
      payload: item
    });
  }
}
