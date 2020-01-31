import { AlternativesDishesPricesGroupedByLabel } from './AlternativesDishesPricesGroupedByLabel';

export class RestaurantMealsGroupedByLabel {
    public value: boolean;
    public restaurantName: string;
    public restaurantMenuUrl: string;
    public alternativesDishesPricesGroupedByLabel: AlternativesDishesPricesGroupedByLabel[];

    constructor(

        value: boolean,
        restaurantName: string,
        restaurantMenuUrl: string,
        alternativesDishesPricesGroupedByLabel: AlternativesDishesPricesGroupedByLabel[]) {

            this.value = value;
            this.restaurantName = restaurantName;
            this.restaurantMenuUrl = restaurantMenuUrl;
            this.alternativesDishesPricesGroupedByLabel = alternativesDishesPricesGroupedByLabel;
    }
}
