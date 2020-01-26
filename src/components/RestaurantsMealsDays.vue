<template>
    <v-tabs
        background-color="transparent"
        color="basil"
        grow
        v-model="activeTab">
        
        <v-tab
            v-for="tabDay of tabsDays"
            :key="tabDay.index">
            {{tabDay.name}}
        </v-tab>

        <v-tab-item 
            v-for="tabDay of tabsDays"
            :key="tabDay.index">

            <v-card flat color="basil" 
                v-for = "areaRestaurantsDishes in testAreasRestaurantsDishes(tabDay.weekDayIndex)"
                :key = "areaRestaurantsDishes.area.id">
                
                <v-card-title class="headline">{{areaRestaurantsDishes.area.name}}</v-card-title>

                <RestaurantsDishes :restaurantsMealsDay="restaurantsMealsDay(tabDay.weekDayIndex)"/>
            </v-card>

        </v-tab-item>

    </v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RestaurantsDishes from './RestaurantsDishes.vue';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import { AreaRestaurantsMeals } from '@/models/AreaRestaurantsMeals';
import { Area } from '../dto/repository/entities/Area';


@Component({
  components: {
    RestaurantsDishes,
  },
})
export default class RestaurantsMealsDays extends Vue {

    @Prop({default: new Array<RestaurantMealsDay>()}) mealsPerAreaWeekYear!: Promise<RestaurantMealsDay[]> ;
    @Prop({default: -1}) currentWeekdayIndex!: number;

    private readonly tabsDays = [
        { index: 0, name: 'Måndag', weekDayIndex: 1 },
        { index: 1, name: 'Tisdag', weekDayIndex: 2 },
        { index: 2, name: 'Onsdag', weekDayIndex: 3 },
        { index: 3, name: 'Torsdag', weekDayIndex: 4 },
        { index: 4, name: 'Fredag', weekDayIndex: 5 },

        { index: 5, name: 'Lördag', weekDayIndex: 6 },
        { index: 6, name: 'Söndag', weekDayIndex: 0 },
      ];
    private activeTab: number = 1;
    
    private async restaurantsMealsDay(weekDayIndex: number): Promise<RestaurantMealsDay[]>  {
        const mealsPerAreaWeekYear = await this.mealsPerAreaWeekYear;
        if (!mealsPerAreaWeekYear.map) {
            return new Array<RestaurantMealsDay>();
        }
        const restaurantsMealsDay = mealsPerAreaWeekYear
            .map( (r) => {
                const mealsPerDayAndRestaurant =
                    new RestaurantMealsDay(
                        r.restaurantName,
                        r.restaurantMenuUrl,
                        r.alternativeLabelDishPrices
                            .filter( (d) => { const correctDay = d.dayIndex === weekDayIndex;
                                return correctDay;
                            }),
                    );
                return mealsPerDayAndRestaurant;
            })
            .filter( (r) => {
                const restaurantHasMealsThisDay = r.alternativeLabelDishPrices.length > 0;
                return restaurantHasMealsThisDay;
            });

        return restaurantsMealsDay;
    }
    private get internalCurrentWeekdayIndex(): number {
        const internalCurrentWeekdayIndex = this.currentWeekdayIndex;

        return internalCurrentWeekdayIndex;
    }

    private get defaultTabIndex(): number {
        const internalCurrentWeekdayIndex = this.internalCurrentWeekdayIndex;
        const initialTab = this.tabsDays.find( (t) => {
            const foundCurrentTab = t.weekDayIndex === internalCurrentWeekdayIndex;
            return foundCurrentTab;
        } );
        const initialTabIndex = initialTab ? initialTab.index : 0;

        return initialTabIndex;
    }

    private mounted() {
        this.activeTab = this.defaultTabIndex;
    }

    private async testAreasRestaurantsDishes(weekDayIndex: number): Promise<AreaRestaurantsMeals[]> {
        const restaurantsMealsDay = await this.restaurantsMealsDay(weekDayIndex);
        return [new AreaRestaurantsMeals( new Area(1, 'Malmö'), restaurantsMealsDay)];
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
