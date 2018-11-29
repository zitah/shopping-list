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
  @Output() selectStore: EventEmitter<string> = new EventEmitter();
  @Output() addStore: EventEmitter<string> = new EventEmitter();

  onSubmit(form: any) {
    this.addStore.emit(form);
  }

  select(store: string) {
    this.selectStore.emit(store);
  }
}
