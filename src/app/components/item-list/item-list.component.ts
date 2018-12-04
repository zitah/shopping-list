import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  addItemForm = new FormGroup ({
    itemName: new FormControl(''),
  });

  @Input() items: Item[];
  @Input() store: string;
  @Output() addItem: EventEmitter<string> = new EventEmitter();
  @Output() deleteItem: EventEmitter<Item> = new EventEmitter();

  onSubmit(form: any) {
    this.addItem.emit(form);
  }

  delete(item: Item) {
    this.deleteItem.emit(item);
  }
}
