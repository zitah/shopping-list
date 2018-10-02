import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '../models/store.model'

@Injectable()
export class StoreDataService {

  itemData$: Subject<Array<Store>>;

  constructor() {}
}