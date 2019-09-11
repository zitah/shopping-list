import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IItem } from '../../interfaces/item.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { IStore } from 'src/app/interfaces/store.interface';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  addItemForm = new FormGroup ({
    itemName: new FormControl(''),
  });

  @Input() items: IItem[];
  @Input() store: IStore;
  @Output() addItem: EventEmitter<string> = new EventEmitter();
  @Output() deleteItem: EventEmitter<IItem> = new EventEmitter();
  @Output() changeItemCompletion: EventEmitter<IItem> = new EventEmitter();

  onSubmit(form: any) {
    this.addItem.emit(form);
    this.addItemForm.reset();
  }

  delete(item: IItem) {
    this.deleteItem.emit(item);
  }

  checkboxChanged(item: IItem) {
    this.changeItemCompletion.emit(item);
  }
}
