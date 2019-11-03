import { Component, OnInit } from '@angular/core';
import { StoreDataService} from '../../services/store-data.service';
import { ItemDataService } from '../../services/item-data.service';
import { IItem } from '../../interfaces/item.interface';
import { IStore } from 'src/app/interfaces/store.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  selectedStore: IStore;
  storeItems$: Observable<IItem[]>;

  constructor(
    public storeDataService: StoreDataService,
    private itemDataService: ItemDataService,
  ) {
  }

  ngOnInit() {
  }

  addStore(form) {
    this.storeDataService.addStore({
      name: form.storeName,
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
      storeId: this.selectedStore.id,
    });
  }

  deleteItem(item) {
    this.itemDataService.deleteItem(item);
  }

  changeItemCompletion(item) {
    this.itemDataService.changeItemCompletion(item);
  }

}
