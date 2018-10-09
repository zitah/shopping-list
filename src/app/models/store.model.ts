import { IStore} from '../interfaces/store.interface';

export class Store {
    name: string;
    hideCompleted: boolean;

    constructor(
        store: IStore,
    ) {
        this.name = store.name;
        this.hideCompleted = store.hideCompleted;
    }
}