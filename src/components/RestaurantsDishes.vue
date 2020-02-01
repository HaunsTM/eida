<template>

    <section>
        <div class="d-md-none single-column">
            <!--hide on screens wider than md-->
            <v-card
                v-for="(restaurantMealsDay, restaurantIndex) in restaurantsMealsDay"
                :key="restaurantIndex"
                class="restaurant-card">

                <v-card-title>
                    <a :href="restaurantMeals(restaurantIndex).restaurantMenuUrl" target="_blank" 
                        class="hide-link-style grey--text text--darken-1">
                        {{restaurantMeals(restaurantIndex).restaurantName}}
                    </a>
                </v-card-title>

                <v-card-text>
                    <v-simple-table dense>
                        <template v-for="(labelGroup, alternativeIndex) in restaurantMeals(restaurantIndex).alternativesDishesPricesGroupedByLabel">
                            <thead :key="`${restaurantIndex}-${alternativeIndex}-${labelGroup.labelName}`">
                                <tr>
                                    <th colspan="2">{{labelGroup.labelName}}</th>
                                </tr>
                            </thead>
                            <tbody :key="labelGroup.labelName">
                                <tr v-for="alternative in labelGroup.alternativesDishesPrices" :key="alternative.dishDescription">
                                    <td>{{ alternative.dishDescription }}</td>
                                    <td>{{ alternative.priceSEK > 0 ? +alternative.priceSEK + ":-" : "*PRIS SAKNAS*"  }}</td>
                                </tr>
                            </tbody>
                        </template>
                        </v-simple-table>
                </v-card-text>
            </v-card>

        </div>
        <div class="d-none d-md-block multi-column-2">            
            <!--hide on screens smaller than md-->
<!--
            <v-card
                v-for="(restaurantMealsDay, loopIndex) in restaurantsMealsDay"
                v-bind:key="loopIndex"
                class="restaurant-card">

                <v-card-title>
                    <a :href="restaurantMeals(loopIndex).restaurantMenuUrl" target="_blank" 
                        class="hide-link-style grey--text text--darken-1">
                        {{ restaurantMeals(loopIndex).restaurantName }}
                    </a>
                </v-card-title>

                <v-data-table
                    :headers="headers" 
                    :items="restaurantMeals(loopIndex)"
                    hide-default-header
                    hide-default-footer
                    disable-pagination
                    disable-sort
                    group-by="labelName"
                    class="restaurant-card-table">

                    <template v-slot:item="props">
                        <tr>
                            <td>{{ props.item.dishDescription }}</td>
                            <td><span>{{ props.item.priceSEK > 0 ? props.item.priceSEK + ":-" : "*PRIS SAKNAS*" }}</span></td>
                        </tr>
                    </template>

                </v-data-table>
            </v-card>
-->
        </div>
    </section>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import { RestaurantMealsGroupedByLabel } from '../models/RestaurantMealsGroupedByLabel';
import { AlternativeLabelDishPrice } from '../dto/AlternativeLabelDishPrice';
import { AlternativesDishesPricesGroupedByLabel } from '../models/AlternativesDishesPricesGroupedByLabel';
import _, { groupBy } from 'lodash';
@Component
export default class RestaurantsDishes extends Vue {
    @Prop() restaurantsMealsDay!: RestaurantMealsDay[];

      private readonly headers = [
        { text: '', value: 'labelName' },
        { text: '', value: 'dishDescription' },
        { text: '', value: 'priceSEK' },
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

      private restaurantMeals(restaurantListIndex: number): RestaurantMealsGroupedByLabel {

        const restaurantName = this.sortedRestaurantMeals[restaurantListIndex].restaurantName;
        const restaurantMenuUrl = this.sortedRestaurantMeals[restaurantListIndex].restaurantMenuUrl;
        
        const alternativesDishesPricesGroupedByLabel =
            _(this.sortedRestaurantMeals[restaurantListIndex].alternativeLabelDishPrices)
           .groupBy( (r) => { return r.labelName })            
            .map( (value, key) => {  
                const a = new AlternativesDishesPricesGroupedByLabel( key, value );
                return a })
            .value();

        const restaurantMealsGroupedByLabel = new RestaurantMealsGroupedByLabel(restaurantName, restaurantMenuUrl,alternativesDishesPricesGroupedByLabel)
        return restaurantMealsGroupedByLabel;
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hide-link-style {
        text-decoration: none;
    }
    .multi-column-2 > .restaurant-card {
        margin-bottom: 0.4rem;
        display: inline-block;
        width: 100%
    }
    .single-column > .restaurant-card {
        margin-bottom: 0.4rem;
        max-width: 500px
    }
    .multi-column-2{
        column-count: 2;
        column-gap: 1rem;
    }
    .restaurant-card-table >>> button {
        display: none;
    }
</style>
