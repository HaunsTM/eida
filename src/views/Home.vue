<template>
  <div class="home">
    <!--
    <RestaurantsMealsDays 
        v-bind:mealsPerAreaWeekYear="internalMealsPerAreaWeekYear"
         v-bind:currentWeekdayIndex="currentWeekNumber"/>
    -->
    {{test}}
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


private test: RestaurantMealsDay[] = new Array<RestaurantMealsDay>();
@Watch('userSelectedAreas')
    private async internalMealsPerAreaWeekYear(): Promise<void> {
        
        const ds = new DataService();

        this.test = await ds.mealsPerAreaWeekYear(this.userSelectedAreas[0].id, this.currentWeekNumber, 2020);

    }


}
</script>
