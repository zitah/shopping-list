import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStore } from '../interfaces/store.interface';
import { MOCK_STORES } from '../mockdata/mock-data';
import { startWith, scan } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { IAction } from 'src/app/interfaces/action.interface';
import { IdGeneratorService } from './id-generator.service';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {

  storeData$: Observable<IStore[]>;
  action$ = new Subject<IAction>();

  // Initial State
  initState = MOCK_STORES;

  // Higher order function to send actions to the stream

  constructor(
    private idGeneratorService: IdGeneratorService,
  ) {
    this.storeData$ = this.action$.pipe(
      scan<IAction, IStore[]>((state, action) => {
        switch (action.type) {
          case 'ADD_STORE':
            return [
              ...state,
              action.payload
            ];
          case 'DELETE_STORE':
            return state.filter(store => store.id !== action.payload);
            case 'CHANGE_HIDECOMPLETED':
                return state.map(store => {
                  if (store.id === action.payload.id) {
                    store.hideCompleted = action.payload.hideCompleted;
                  }
                  return store;
                });
          default:
            return state;
        }
      }, this.initState),
      startWith(this.initState),
    );

    this.storeData$.subscribe((storeData: IStore[]) => { });
  }

  addStore(partialStore: Partial<IStore>) {
    const store: IStore = {
      name: partialStore.name,
      hideCompleted: false,
      id: this.idGeneratorService.generateStoreId(),
    };

    this.action$.next({
      type: 'ADD_STORE',
      payload: store
    });
  }

  deleteStore(storeId: string) {
    this.action$.next({
      type: 'DELETE_STORE',
      payload: storeId
    });
  }

  changeStoreHideCompleted(storeId: string, hideCompleted: boolean) {
    const store: Partial<IStore> = {
      hideCompleted: hideCompleted,
      id: storeId,
    };

    this.action$.next({
      type: 'CHANGE_HIDECOMPLETED',
      payload: store
    });
  }
}
