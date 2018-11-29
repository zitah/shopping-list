import { Component, OnInit } from '@angular/core';
import { StoreDataService} from '../../services/store-data.service';
import { ItemDataService } from '../../services/item-data.service';
import { Item } from '../../models/item.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  selectedStore: string;
  storeItems$: Observable<Item[]>;

  constructor(
    private storeDataService: StoreDataService,
    private itemDataService: ItemDataService
  ) {
  }

  ngOnInit() {
  }

  addStore(form) {
    this.storeDataService.addStore({
      name: form.storeName,
      hideCompleted: false
    });
  }

  selectStore(store) {
    this.selectedStore = store;
    this.storeItems$ = this.itemDataService.getStoreItems(store);
  }

}
