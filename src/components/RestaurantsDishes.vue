<template>
    <section>
        <v-card
            v-for="(restaurantMealsDay, loopIndex) in restaurantsMealsDay"
            v-bind:key="restaurantMealsDay.restaurantMenuUrl"
            class="mx-auto restaurant-card"
            max-width="500">

            <v-card-title>
                <a :href="restaurantMealsDay.restaurantMenuUrl" target="_blank" 
                    class="hide-link-style grey--text text--darken-1">
                    {{ restaurantMealsDay.restaurantName }}
                </a>
            </v-card-title>

            <v-data-table 
                :headers="headers" 
                :items="restaurantMeals(loopIndex)"
                hide-default-header
                hide-default-footer
                disable-pagination
                disable-sort
                group-expanded>

                <template v-slot:item="props">
                    <tr>
                        <td>{{ props.item.labelName }}</td>
                        <td>{{ props.item.dishDescription }}</td>
                        <td><span>{{ props.item.priceSEK }}:-</span></td>
                    </tr>
                </template>

            </v-data-table>

        </v-card>
    </section>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import { RestaurantMeal } from '../models/RestaurantMeal';
import { AlternativeLabelDishPrice } from '../dto/AlternativeLabelDishPrice';

@Component
export default class RestaurantsDishes extends Vue {
    @Prop() restaurantsMealsDay!: RestaurantMealsDay[];

      private readonly headers = [
        { text: '', value: 'labelName' },
        { text: 'Rätt', value: 'dishDescription' },
        { text: 'Pris (kr)', value: 'priceSEK' },
      ];

      private get sortedRestaurantMeals(): RestaurantMealsDay[] {
        const sortedRestaurantMeals =
            this.restaurantsMealsDay
            .sort((a, b) => {
                if (a.restaurantName < b.restaurantName) {
                        return -1;
                    }
                if (a.restaurantName > b.restaurantName) {
                        return 1;
                    }
                return 0;
            })
            .map( (r) => {

                const sortedAlternativeLabelDishPrices = r.alternativeLabelDishPrices.sort((a, b) => {
                    if (a.labelName < b.labelName) {
                        return -1;
                    }
                    if (a.labelName > b.labelName) {
                        return 1;
                    }
                    return 0;
                });

                r.alternativeLabelDishPrices = sortedAlternativeLabelDishPrices;
                return r;
            });
        return sortedRestaurantMeals;
      }

      private restaurantMeals(restaurantListIndex: number): RestaurantMeal[] {

        const restaurantName = this.sortedRestaurantMeals[restaurantListIndex].restaurantName;
        const restaurantMenuUrl = this.sortedRestaurantMeals[restaurantListIndex].restaurantMenuUrl;
        const restaurantMeals =
          this.sortedRestaurantMeals[restaurantListIndex].alternativeLabelDishPrices.map( (d) => {
            // RestaurantMeal
            const value = false;
            const restaurantMeal =
                new RestaurantMeal(
                    value,
                    restaurantName, restaurantMenuUrl,
                    new AlternativeLabelDishPrice(
                    d.indexNumber, d.labelName, d.dishDescription, +d.priceSEK),
                );
            return restaurantMeal;
        });
        return restaurantMeals;
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hide-link-style {
        text-decoration: none;
    }
    .restaurant-card {
        margin-bottom: 0.4rem;
    }
</style>
