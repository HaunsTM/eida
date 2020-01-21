import { Area } from '@/dto/repository/entities/Area';
import { RestaurantMealsDay } from '@/dto/RestaurantMealsDay';

export class AreaRestaurantsDishes {

    public area: Area;
    public restaurantMealsDay: RestaurantMealsDay[];

    constructor(area: Area, restaurantMealsDay: RestaurantMealsDay[]) {
        this.area = area;
        this.restaurantMealsDay = restaurantMealsDay;
    }

}
