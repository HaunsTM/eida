<template>
<v-tabs
  background-color="transparent"
  color="basil"
  grow
  v-model="activeTab"
>
    <v-tab
        v-for="tabDay of tabsDays"
        :key="tabDay.index"
    >
        {{tabDay.name}}
    </v-tab>

    <v-tab-item 
        v-for="tabDay of tabsDays"
        :key="tabDay.index">

    <v-card flat color="basil">
      <v-card-text>
        <p>{{mealsPerDay(tabDay.weekDayIndex)}}</p>
        
  
      </v-card-text>
    </v-card>
  </v-tab-item>

</v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RestaurantDish from './RestaurantDish.vue';
import { RestaurantMeal } from '../dto/RestaurantMeal';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';


@Component({
  components: {
    RestaurantDish
  }
})
export default class RestaurantsMealsDays extends Vue {
 
    @Prop({default: new Array<RestaurantMealsDay>()}) mealsPerAreaWeekYear!: Array<RestaurantMealsDay>;
    @Prop({default: -1}) currentWeekdayIndex!: number;

    readonly tabsDays = [
        { index: 0, name: 'Måndag', weekDayIndex: 1 },
        { index: 1, name: 'Tisdag', weekDayIndex: 2 },
        { index: 2, name: 'Onsdag', weekDayIndex: 3 },
        { index: 3, name: 'Torsdag', weekDayIndex: 4 },
        { index: 4, name: 'Fredag', weekDayIndex: 5 },

        { index: 5, name: 'Lördag', weekDayIndex: 6 },
        { index: 6, name: 'Söndag', weekDayIndex: 0 },
      ];
    activeTab: number = 1;
    get internalMealsPerAreaWeekYear(): Array<RestaurantMealsDay> {
        const internalMealsPerAreaWeekYear = this.mealsPerAreaWeekYear;
        return  internalMealsPerAreaWeekYear;
    }
    mealsPerDay(weekDayIndex: number): Array<RestaurantMealsDay> {
        const mealsPerDay = this.internalMealsPerAreaWeekYear
            .map( (x) => {
                const mealsPerDayAndRestaurant =
                    new RestaurantMealsDay(
                        x.restaurantName,
                        x.restaurantMenuUrl,
                        x.alternativeLabelDishPrices
                            .filter( (x) => { const correctDay = x.dayIndex === weekDayIndex;
                                return correctDay;
                            })
                    );
                return mealsPerDayAndRestaurant; })
            .filter( (x) => {
                const restaurantHasMealsThisDay = x.alternativeLabelDishPrices.length > 0;
                return restaurantHasMealsThisDay;
            });

        return mealsPerDay;
    }
    get internalCurrentWeekdayIndex(): number {
        const internalCurrentWeekdayIndex = this.currentWeekdayIndex;

        return internalCurrentWeekdayIndex;
    }

    get defaultTabIndex(): number {
        const internalCurrentWeekdayIndex = this.internalCurrentWeekdayIndex;
        const initialTab = this.tabsDays.find( (t) => {
            const foundCurrentTab = t.weekDayIndex === internalCurrentWeekdayIndex;
            return foundCurrentTab;
        } );
        const initialTabIndex = initialTab ? initialTab.index : 0;

        return initialTabIndex;
    }
    mounted() {
        this.activeTab = this.defaultTabIndex;
    }
    

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
