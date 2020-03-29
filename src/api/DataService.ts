
import { UrbanAreaAreas } from '../dto/UrbanAreaAreas';
import { AreaRestaurants } from '../dto/AreaRestaurants';
import { RestaurantMeal } from '../dto/RestaurantMeal';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import axios from 'axios';

export default class DataService {

    public readonly baseURL = 'https://api.sulten.se';

    // Lifecycle hook
    public async allAreasPerUrbanAreas(): Promise<UrbanAreaAreas[]>  {

        const result = await axios.get(`${this.baseURL}/menu/allAreasPerUrbanAreas`);
        const allAreasPerUrbanAreas: UrbanAreaAreas[] = JSON.parse(JSON.stringify(result.data));

        return allAreasPerUrbanAreas;
    }
    public async mealsPerAreaWeekYear(
        areaId: number, weekNumber: number, weekYear: number): Promise<RestaurantMealsDay[]>  {

        const result = await axios.get(`${this.baseURL}/menu/mealsPerAreaWeekYear/${areaId}/${weekNumber}/${weekYear}`);
        const mealsPerAreaWeekYear: RestaurantMealsDay[] = JSON.parse(JSON.stringify(result.data));

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
