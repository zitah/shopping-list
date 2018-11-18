import { Component, OnInit } from '@angular/core';
import { StoreDataService} from '../../services/store-data.service';
import { Store } from '../../models/store.model';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent {

  constructor(
    private storeDataService: StoreDataService
  ) { }

}
