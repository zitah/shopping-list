import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model'

@Injectable()
export class ItemDataService {

  itemData$: Subject<Array<Item>>;

  constructor() {}
}