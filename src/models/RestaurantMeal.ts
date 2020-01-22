import { AlternativeLabelDishPrice } from '../dto/AlternativeLabelDishPrice';

export class RestaurantMeal {

    public get category(): string {
        return this.restaurantName;
    }
    public restaurantName: string;
    public restaurantMenuUrl: string;
    public alternativeLabelDishPrice: AlternativeLabelDishPrice;

    constructor(
        restaurantName: string,
        restaurantMenuUrl: string,
        alternativeLabelDishPrice: AlternativeLabelDishPrice) {

            this.restaurantName = restaurantName;
            this.restaurantMenuUrl = restaurantMenuUrl;
            this.alternativeLabelDishPrice = alternativeLabelDishPrice;
    }
}
