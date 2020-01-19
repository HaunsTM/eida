<template>
<v-tabs
  background-color="transparent"
  color="basil"
  grow
  v-model="activeTab"
>
    <v-tab
        v-for="tab of tabs"
        :key="tab.index"
    >
        {{tab.name}}
    </v-tab>

  <v-tab-item>
    <v-card flat color="basil">
      <v-card-text>
        First tab contents
      </v-card-text>
    </v-card>
  </v-tab-item>
  

</v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RestaurantMealDay } from '../dto/RestaurantMealDay';

@Component
export default class RestaurantsMealsDays extends Vue {
 
    @Prop({default: new Array<RestaurantMealDay>()}) mealsPerAreaWeekYear!: Array<RestaurantMealDay>;
    @Prop({default: -1}) currentWeekdayIndex!: number;


    readonly tabs = [
        { index: 1, name: 'Måndag', weekDayIndex: 1 },
        { index: 2, name: 'Tisdag', weekDayIndex: 2 },
        { index: 3, name: 'Onsdag', weekDayIndex: 3 },
        { index: 4, name: 'Torsdag', weekDayIndex: 4 },
        { index: 5, name: 'Fredag', weekDayIndex: 5 },

        { index: 6, name: 'Lördag', weekDayIndex: 6 },
        { index: 7, name: 'Söndag', weekDayIndex: 0 },
      ];
    activeTab: number = 1;
    get internalMealsPerAreaWeekYear(): Array<RestaurantMealDay> {
        const internalMealsPerAreaWeekYear = this.mealsPerAreaWeekYear;
        return  internalMealsPerAreaWeekYear;
    }

    get internalCurrentWeekdayIndex(): number {
        const internalCurrentWeekdayIndex = this.currentWeekdayIndex;

        return internalCurrentWeekdayIndex;
    }
    get defaultTabIndex(): number {
        const initialTab = this.tabs.find( (t) => { return t.weekDayIndex === this.internalCurrentWeekdayIndex } );
        const initialTabIndex = initialTab ? initialTab.index : 0;
debugger;
        return initialTabIndex;
    }
    beforeCreate() {
        this.activeTab = this.defaultTabIndex;
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
