import { AlternativeLabelDishPrice } from '../dto/AlternativeLabelDishPrice';

export class RestaurantMeal {    
    public value: boolean;
    public restaurantName: string;
    public restaurantMenuUrl: string;
    private alternativeLabelDishPrice: AlternativeLabelDishPrice;

    public get labelName(): string {
        return this.alternativeLabelDishPrice.labelName;
    };
    public get dishDescription(): string {
        return this.alternativeLabelDishPrice.dishDescription;
    };
    public get priceSEK(): string {
        return this.alternativeLabelDishPrice.priceSEK.toString();
    };

    constructor(
        value: boolean,
        restaurantName: string,
        restaurantMenuUrl: string,
        alternativeLabelDishPrice: AlternativeLabelDishPrice) {
            this.value = value;
            this.restaurantName = restaurantName;
            this.restaurantMenuUrl = restaurantMenuUrl;
            this.alternativeLabelDishPrice = alternativeLabelDishPrice;
    }
}
