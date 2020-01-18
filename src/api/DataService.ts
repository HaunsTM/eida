
import { Area } from '../dto/repository/entities/Area';
import { AreaRestaurants } from '../dto/AreaRestaurants';
import { RestaurantMeal } from '../dto/RestaurantMeal';
import { RestaurantMealDay } from '../dto/RestaurantMealDay';
import axios from 'axios';

export default class DataService {

    public readonly baseURL = 'https://api.sulten.se';

    // Lifecycle hook
    public async allAreas(): Promise<Area[]>  {

        const result = await axios.get(`${this.baseURL}/menu/allAreas`);
        const allAreas: Area[] = JSON.parse(JSON.stringify(result.data));

        return allAreas;
    }
    public async mealsPerAreaWeekYear(
        areaId: number, weekNumber: number, weekYear: number): Promise<RestaurantMealDay[]>  {

        const result = await axios.get(`${this.baseURL}/menu/mealsPerAreaWeekYear/${areaId}/${weekNumber}/${weekYear}`);
        const mealsPerAreaWeekYear: RestaurantMealDay[] = JSON.parse(JSON.stringify(result.data));

        return mealsPerAreaWeekYear;
    }
    public async mealsPerAreaDayWeekYear(
        areaId: number, dayIndex: number, weekNumber: number, weekYear: number): Promise<RestaurantMeal[]>  {

        const result = await axios.get(`${this.baseURL}/menu/mealsPerAreaDayWeekYear/${areaId}/${dayIndex}/${weekNumber}/${weekYear}`);
        const mealsPerAreaDayWeekYear: RestaurantMeal[] = JSON.parse(JSON.stringify(result.data));

        return mealsPerAreaDayWeekYear;
    }
    public async restaurantsPerArea(areaId: number): Promise<AreaRestaurants[]>  {

        const result = await axios.get(`${this.baseURL}/menu/restaurantsPerArea/${areaId}`);
        const restaurantsPerArea: AreaRestaurants[] = JSON.parse(JSON.stringify(result.data));

        return restaurantsPerArea;
    }
}
