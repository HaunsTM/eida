import { IndexNumber } from '../enum/IndexNumber';

export class AlternativeDishPrice {

    public indexNumber: IndexNumber;
    public dishDescription: string;
    public priceSEK: number;

    constructor(
        indexNumber: IndexNumber,
        dishDescription: string,
        priceSEK: number) {

            this.indexNumber = indexNumber;
            this.dishDescription = dishDescription;
            this.priceSEK = priceSEK;
    }
}
