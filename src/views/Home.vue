<template>
  <div class="home">

    <RestaurantsMealsDays 
        v-bind:areasMealsRestaurants="internalAreasMealsRestaurants"
        v-bind:currentWeekdayIndex="currentWeekNumber"/>

  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Area } from '@/dto/repository/entities/Area';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import RestaurantsMealsDays from '@/components/RestaurantsMealsDays.vue';
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
    }

    private async created() {
        await this.fetchAreasMealsRestaurants();
    }

}
</script>
