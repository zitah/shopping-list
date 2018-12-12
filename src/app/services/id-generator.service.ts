import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  generateItemId() {
      return 'item-' + Math.random().toString(36).substr(2, 16);
  }

  generateStoreId() {
    return 'store-' + Math.random().toString(36).substr(2, 16);
  }
}
