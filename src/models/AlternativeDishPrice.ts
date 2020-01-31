import { IndexNumber } from '../enum/IndexNumber';

export class AlternativeDishPrice {

    public indexNumber: IndexNumber;
    public dishDescription: string;
    public priceSEK: number;

    constructor(
        indexNumber: IndexNumber,
        dishDescription: string,
        pricesSEK: number) {

            this.indexNumber = indexNumber;
            this.dishDescription = dishDescription;
            this.priceSEK = pricesSEK;
    }
}
