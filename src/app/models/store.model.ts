import { IStore} from '../interfaces/store.interface';

export class Store {
    name: string;
    hideCompleted: boolean;
    id: string;

    constructor(
        store: IStore,
    ) {
        this.name = store.name;
        this.hideCompleted = store.hideCompleted;
        this.id = store.id;
    }
}
