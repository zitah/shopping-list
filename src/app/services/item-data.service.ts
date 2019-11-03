import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from '../interfaces/item.interface';
import { MOCK_ITEMS } from '../mockdata/mock-data';
import { startWith, scan, map } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { IAction } from 'src/app/interfaces/action.interface';
import { IdGeneratorService } from './id-generator.service';
import { IStore } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemDataService {

  itemData$: Observable<IItem[]>;
  action$ = new Subject<IAction>();

  // Initial State
  initState = MOCK_ITEMS;

  // Higher order function to send actions to the stream

  constructor(
    private idGeneratorService: IdGeneratorService,
  ) {
    this.itemData$ = this.action$.pipe(
      scan<IAction, IItem[]>((state, action) => {
        switch (action.type) {
          case 'ADD_ITEM':
            return [
              ...state,
              action.payload
            ];
          case 'DELETE_ITEM':
            return state.filter(item => (item.id !== action.payload.id));
          case 'DELETE_STOREITEMS':
            return state.filter(item => item.storeId !== action.payload);
          case 'CHANGE_ITEMCOMPLETION':
            return state.map(item => {
              if (item.id === action.payload.id) {
                item.completed = action.payload.completed;
              }
              return item;
            });
          default:
            return state;
        }
      }, this.initState),
      startWith(this.initState),
    );

    this.itemData$.subscribe((itemData: IItem[]) => { });
  }

  addItem(partialItem: Partial<IItem>) {
    const item: IItem = {
      name: partialItem.name,
      completed: false,
      storeId: partialItem.storeId,
      id: this.idGeneratorService.generateItemId(),
    };

    this.action$.next({
      type: 'ADD_ITEM',
      payload: item
    });
  }

  getStoreItems(store: IStore): Observable<IItem[]> {
    return this.itemData$.pipe(
      map(items => {
        let storeItems = items.filter(item => item.storeId === store.id);
        return store.hideCompleted ? storeItems.filter(item => !item.completed) : storeItems;
      }));
  }

  deleteItem(item: IItem) {
    this.action$.next({
      type: 'DELETE_ITEM',
      payload: item
    });
  }

  deleteStoreItems(storeId: string) {
    this.action$.next({
      type: 'DELETE_STOREITEMS',
      payload: storeId
    });
  }

  changeItemCompletion(item: IItem) {
    const partialItem: Partial<IItem> = {
      completed: !item.completed,
      id: item.id,
    };

    this.action$.next({
      type: 'CHANGE_ITEMCOMPLETION',
      payload: partialItem
    });
  }
}
