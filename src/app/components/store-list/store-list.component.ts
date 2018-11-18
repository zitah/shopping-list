import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '../../models/store.model';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent {

  @Input() stores: Store[];
  @Input() selectedStore: Store;
  @Output() selectStore: EventEmitter<string> = new EventEmitter();

  select(store: string) {
    this.selectStore.emit(store);
  }
}
