import { Component, OnInit } from '@angular/core';
import { StoreDataService} from '../../services/store-data.service';
import { Store } from '../../models/store.model';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
<<<<<<< HEAD
export class StoreListComponent {
=======
export class StoreListComponent implements OnInit {

  stores: Store[];
  selectedStore: Store;
>>>>>>> Create storelist component

  constructor(
    private storeDataService: StoreDataService
  ) { }

<<<<<<< HEAD
=======
  ngOnInit() {
    this.storeDataService.storeData$.subscribe(stores =>
      this.stores = stores);
  }

  selectStore(store: Store) {
    this.selectedStore = store;
  }
>>>>>>> Create storelist component
}
