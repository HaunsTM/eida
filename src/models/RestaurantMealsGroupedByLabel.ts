import { AlternativesDishesPricesGroupedByLabel } from './AlternativesDishesPricesGroupedByLabel';

export class RestaurantMealsGroupedByLabel {
    public restaurantName: string;
    public restaurantMenuUrl: string;
    public alternativesDishesPricesGroupedByLabel: AlternativesDishesPricesGroupedByLabel[];

    constructor(

        restaurantName: string,
        restaurantMenuUrl: string,
        alternativesDishesPricesGroupedByLabel: AlternativesDishesPricesGroupedByLabel[]) {

            this.restaurantName = restaurantName;
            this.restaurantMenuUrl = restaurantMenuUrl;
            this.alternativesDishesPricesGroupedByLabel = alternativesDishesPricesGroupedByLabel;
    }
}
