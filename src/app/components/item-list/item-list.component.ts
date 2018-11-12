import { Component, OnInit } from '@angular/core';
import { ItemDataService } from 'src/app/services/item-data.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[];

  constructor(
    private ItemDataService: ItemDataService
  ) { }

  ngOnInit() {
    this.ItemDataService.itemData$.subscribe(items =>
      this.items = items);
  }
}
