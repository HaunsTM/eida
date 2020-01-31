import { AlternativeDishPrice } from './AlternativeDishPrice';

export class AlternativesDishesPricesGroupedByLabel {

    public labelName: string;
    public alternativesDishesPrices: AlternativeDishPrice[];

    constructor(
        labelName: string,
        alternativesDishesPrices: AlternativeDishPrice[]) {

            this.labelName = labelName;
            this.alternativesDishesPrices = alternativesDishesPrices;
    }
}
