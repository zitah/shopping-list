import { Component, OnInit } from '@angular/core';
import { StoreDataService} from '../../services/store-data.service';
import { ItemDataService } from '../../services/item-data.service';
import { IdGeneratorService } from '../../services/id-generator.service';
import { Item } from '../../models/item.model';
import { Store } from 'src/app/models/store.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  selectedStore: Store;
  storeItems$: Observable<Item[]>;

  constructor(
    public storeDataService: StoreDataService,
    private itemDataService: ItemDataService,
    private idGeneratorService: IdGeneratorService,
  ) {
  }

  ngOnInit() {
  }

  addStore(form) {
    this.storeDataService.addStore({
      name: form.storeName,
      hideCompleted: false,
      id: this.idGeneratorService.generateStoreId(),
    });
  }

  selectStore(store) {
    this.selectedStore = store;
    this.storeItems$ = this.itemDataService.getStoreItems(store.id);
  }

  deleteStore(storeId) {
    this.storeDataService.deleteStore(storeId);
    this.itemDataService.deleteStoreItems(storeId);
    if (this.selectedStore.id = storeId) {
      this.selectedStore = null;
    }
  }

  addItem(form) {
    this.itemDataService.addItem({
      name: form.itemName,
      completed: false,
      storeId: this.selectedStore.id,
      id: this.idGeneratorService.generateItemId(),
    });
  }

  deleteItem(item) {
    this.itemDataService.deleteItem(item);
  }

}
