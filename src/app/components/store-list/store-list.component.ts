import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '../../models/store.model';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent {
  addStoreForm = new FormGroup ({
    storeName: new FormControl(''),
  });

  @Input() stores: Store[];
  @Output() selectStore: EventEmitter<Store> = new EventEmitter();
  @Output() addStore: EventEmitter<string> = new EventEmitter();
  @Output() deleteStore: EventEmitter<string> = new EventEmitter();

  onSubmit(form: any) {
    this.addStore.emit(form);
    this.addStoreForm.reset();
  }

  select(store: Store) {
    this.selectStore.emit(store);
  }

  delete(storeId: string) {
    this.deleteStore.emit(storeId);
  }
}
