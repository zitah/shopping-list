import { Component, Input } from '@angular/core';
import { Item } from '../../models/item.model';
import { Store } from '../../models/store.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  @Input() items: Item[];
  @Input() store: string;
}
