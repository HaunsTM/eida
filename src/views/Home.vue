<template>
  <div class="home">

    <RestaurantsMealsDays 
        v-bind:areasMealsRestaurants="internalAreasMealsRestaurants"
        v-bind:currentWeekdayIndex="currentWeekdayIndex"/>

  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Area } from '@/dto/repository/entities/Area';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import RestaurantsMealsDays from '@/components/RestaurantsMealsDays.vue';
import NoMealsForSelectedAreasYet from '@/components/NoMealsForSelectedAreasYet.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import moment from 'moment';
import DataService from '../api/DataService';
import { AreaRestaurantsMeals } from '../models/AreaRestaurantsMeals';

@Component({
    components: {
        RestaurantsMealsDays,
    },
    computed: {
        ...mapGetters({
            userSelectedAreas: 'getUserSelectedAreas',

            currentWeekdayIndex: 'getCurrentWeekdayIndex',
            currentWeekNumber: 'getCurrentWeekNumber',
            currentYear: 'getCurrentYear'
        }), 
    },
})
export default class Home extends Vue {

    private userSelectedAreas!: Area[];

    private currentWeekdayIndex!: number;
    private currentWeekNumber!: number;
    private currentYear!: number;

    private internalAreasMealsRestaurants = new Array<AreaRestaurantsMeals>();
    
    @Watch('userSelectedAreas')
    private async fetchAreasMealsRestaurants(): Promise<void> {
        //const ds = new DataService();
        const currentWeekNumber = this.currentWeekNumber;
        const currentYear = this.currentYear;
        const areasMealsRestaurantsPromises = this.userSelectedAreas.map( async (a) => {
            const ds = new DataService();
            const  mealsPerAreaWeekYear = await ds.mealsPerAreaWeekYear(a.id, currentWeekNumber, currentYear);
            const currentAreaRestaurantsMeals = new AreaRestaurantsMeals(a, mealsPerAreaWeekYear);
            return currentAreaRestaurantsMeals;
        });

        const areasMealsRestaurants = await Promise.all(await areasMealsRestaurantsPromises);
        this.internalAreasMealsRestaurants = areasMealsRestaurants;
        const totalNumberOfMealsPerDay = this.totalNumberOfMealsPerDay(2);
    }

    private totalNumberOfMealsPerDay(dayIndex: number): number {

        const totalNumberOfMealsPerDay =
            this.internalAreasMealsRestaurants.map( (area) => {
                const allRestaurantsInArea = area.restaurantMealsDay;
                const arrayOfAllMealsPerRestaurantAndDay =
                    allRestaurantsInArea.map( (restaurant) => {
                        const allDishesForWantedDay =
                        restaurant.alternativeLabelDishPrices.filter( (aLDP) => {
                            const correctDayFound = aLDP.dayIndex === dayIndex;
                            return correctDayFound;
                        });
                        return allDishesForWantedDay;
                    })
                return arrayOfAllMealsPerRestaurantAndDay.flatMap(x=>x);
            })
        .flatMap(x=>x)
        .length;
    debugger;
        return 0;
    }

    private async created() {
        await this.fetchAreasMealsRestaurants();
    }

}
</script>
