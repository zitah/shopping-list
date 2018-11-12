import { Component, OnInit } from '@angular/core';
import { StoreDataService} from '../../services/store-data.service';
import { Store } from '../../models/store.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  stores: Store[];

  constructor(
    private storeDataService: StoreDataService
  ) { }

  ngOnInit() {
    this.storeDataService.storeData$.subscribe(stores =>
      this.stores = stores);
  }
}
