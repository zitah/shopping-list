import { IItem } from '../interfaces/item.interface';

export class Item {
    name: string;
    completed: boolean;
    storeId: string;
    id: string;

    constructor(
        item: IItem,
    ) {
        this.name = item.name;
        this.completed = item.completed;
        this.storeId = item.storeId;
        this.id = item.id;
    }
}
