import { Component, OnInit, Input } from '@angular/core';
import { ItemDataService } from '../../../services/item-data.service';
import { Item } from '../../../models/item.model';
import { Store } from '../../../models/store.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[];
  filteredItems: Item[];

  @Input() store: Store;
  
  constructor(
    private ItemDataService: ItemDataService
  ) { }

  ngOnInit() {
    this.ItemDataService.itemData$.subscribe(items => 
      this.items = items)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filteredItems = this.items.filter(item => 
      item.storeId === this.store.name);
  }
}
