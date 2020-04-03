<template>
    <div class="home">
        <div v-if="atLeastOneRestaurantHasOneMealInCurrentWeek()">
            <RestaurantsMealsDays 
                v-bind:areasMealsRestaurants="internalAreasMealsRestaurants"
                v-bind:currentWeekdayIndex="currentWeekdayIndex"/>
        </div>
        <div v-else>
            <NoMealsForSelectedAreasYet />
        </div>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Area } from '@/dto/repository/entities/Area';
import { UrbanAreaAreas } from '../dto/UrbanAreaAreas';

import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import RestaurantsMealsDays from '@/components/RestaurantsMealsDays.vue';
import NoMealsForSelectedAreasYet from '@/components/NoMealsForSelectedAreasYet.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import moment from 'moment';
import DataService from '../api/DataService';
import { AreaRestaurantsMeals } from '../models/AreaRestaurantsMeals';
import { AlternativeLabelDishPriceDay } from '../dto/AlternativeLabelDishPriceDay';
import { UserSelectedArea } from '../dto/repository/entities/UserSelectedArea';

@Component({
    components: {
        NoMealsForSelectedAreasYet,
        RestaurantsMealsDays,
    },
    computed: {
        ...mapGetters({
            userSelectedAreas: 'getUserSelectedAreas',

            currentWeekdayIndex: 'getCurrentWeekdayIndex',
            currentWeekNumber: 'getCurrentWeekNumber',
            currentYear: 'getCurrentYear',
        }),
    },
})
export default class Home extends Vue {

    private userSelectedAreas!: UserSelectedArea[];

    private currentWeekdayIndex!: number;
    private currentWeekNumber!: number;
    private currentYear!: number;

    private internalAreasMealsRestaurants = new Array<AreaRestaurantsMeals>();
    
    
    @Watch('userSelectedAreas')
    private async fetchAreasMealsRestaurants(): Promise<void> {
    
        const currentWeekNumber = this.currentWeekNumber;
        const currentYear = this.currentYear;
        const areasMealsRestaurantsPromises = this.userSelectedAreas.map( async (uSA) => {
            const ds = new DataService();

            const  mealsPerAreaWeekYear = await ds.mealsPerAreaWeekYear(uSA.area.id, currentWeekNumber, currentYear);
            const currentAreaRestaurantsMeals = new AreaRestaurantsMeals(uSA.area, mealsPerAreaWeekYear);
            return currentAreaRestaurantsMeals;
        });
        
        const areasMealsRestaurants = await Promise.all(await areasMealsRestaurantsPromises);
        this.internalAreasMealsRestaurants = areasMealsRestaurants;
    }

    private get allDayIndexesInAWeek(): number[] {
        const allDayIndexesInAWeek = [0, 1, 2, 3, 4, 5, 6];
        return allDayIndexesInAWeek;
    }

    private atLeastOneRestaurantHasOneMealInCurrentWeek(): boolean {

        let atLeastOneRestaurantHasOneMealInCurrentWeek = false;

        if (this.internalAreasMealsRestaurants) {
            const mealsPerAreaRestaurantsAndDays =
                this.mealsPerAreaRestaurantsAndDays( this.allDayIndexesInAWeek, this.internalAreasMealsRestaurants );
            atLeastOneRestaurantHasOneMealInCurrentWeek = mealsPerAreaRestaurantsAndDays.length > 0;
        }
        return atLeastOneRestaurantHasOneMealInCurrentWeek;
    }

    private mealsPerRestaurantAndDay(
        dayIndexes: number[],
        allRestaurantsMealsInArea: RestaurantMealsDay[]): AlternativeLabelDishPriceDay[] {

        const arrayOfAllMealsPerRestaurantAndDay =
            allRestaurantsMealsInArea.map( (restaurant) => {
                const allDishesForWantedDay =
                    restaurant.alternativeLabelDishPrices.filter( (aLDP) => {
                        const correctDayFound = dayIndexes.includes( aLDP.dayIndex );
                        return correctDayFound;
                    });
                return allDishesForWantedDay;
            });
        const mealsPerRestaurantAndDay = arrayOfAllMealsPerRestaurantAndDay
            .flatMap( ( x ) => {
                return x; });
        return mealsPerRestaurantAndDay;
    }

    private mealsPerAreaRestaurantsAndDays(
        dayIndexes: number[],
        areasMealsRestaurants: AreaRestaurantsMeals[]): AlternativeLabelDishPriceDay[] {

        const mealsPerAreaRestaurantsAndDay =
            areasMealsRestaurants.map( (area) => {
                const allRestaurantsInArea = area.restaurantMealsDay;
                return this.mealsPerRestaurantAndDay(dayIndexes, allRestaurantsInArea);
            })
        .flatMap( ( x ) => { return x; } )
        .filter( ( x ) => { return this.isEligible( x ); } );

        return mealsPerAreaRestaurantsAndDay;
    }

    private isEligible(value: any) {
        // used to identify null/undefined/empty/false-values in an array
        if (value !== false || value !== null || value !== 0 || value !== '' || value !== undefined) {
            return value;
        } else {
            return false;
        }
    }

    private async created() {
        await this.fetchAreasMealsRestaurants();
    }

}
</script>
