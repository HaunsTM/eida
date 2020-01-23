<template>
  <div class="home">
    <RestaurantsMealsDays v-bind:mealsPerAreaWeekYear="internalMealsPerAreaWeekYear" v-bind:currentWeekdayIndex="internalCurrentWeekdayIndex"/>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import RestaurantsMealsDays from '@/components/RestaurantsMealsDays.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component({
  components: {
    RestaurantsMealsDays
  }
})
export default class Home extends Vue {

    get internalMealsPerAreaWeekYear(): Array<RestaurantMealsDay> {
        const internalMealsPerAreaWeekYear = this.$store.state.currentRestaurantsMealsDays;
        return  internalMealsPerAreaWeekYear;
    }

    get internalCurrentWeekdayIndex(): number {
        const currentWeekNumber = moment().weekday();

        return currentWeekNumber;
    }

};
</script>
