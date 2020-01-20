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
        {{internalMealsPerAreaWeekYear}}
        
  <RestaurantDish />
      </v-card-text>
    </v-card>
  </v-tab-item>

</v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RestaurantMealDay } from '../dto/RestaurantMealDay';
import RestaurantDish from './RestaurantDish.vue';


@Component({
  components: {
    RestaurantDish
  }
})
export default class RestaurantsMealsDays extends Vue {
 
    @Prop({default: new Array<RestaurantMealDay>()}) mealsPerAreaWeekYear!: Array<RestaurantMealDay>;
    @Prop({default: -1}) currentWeekdayIndex!: number;

    readonly tabs = [
        { index: 0, name: 'Måndag', weekDayIndex: 1 },
        { index: 1, name: 'Tisdag', weekDayIndex: 2 },
        { index: 2, name: 'Onsdag', weekDayIndex: 3 },
        { index: 3, name: 'Torsdag', weekDayIndex: 4 },
        { index: 4, name: 'Fredag', weekDayIndex: 5 },

        { index: 5, name: 'Lördag', weekDayIndex: 6 },
        { index: 6, name: 'Söndag', weekDayIndex: 0 },
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
        const internalCurrentWeekdayIndex = this.internalCurrentWeekdayIndex;
        const initialTab = this.tabs.find( (t) => {
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
