<template>

    <section>
        <div class="coulumn-configuration">
            <v-card
                v-for="(restaurantMealsDay, restaurantIndex) in restaurantsMealsGroupedByLabel"
                :key="restaurantIndex"
                class="restaurant-card">

                <v-card-title>
                    <a :href="restaurantsMealsGroupedByLabel[restaurantIndex].restaurantMenuUrl" target="_blank" 
                        class="hide-link-style grey--text text--darken-1">
                        {{restaurantsMealsGroupedByLabel[restaurantIndex].restaurantName}}
                    </a>
                </v-card-title>
                <v-card-text>
                    <v-simple-table
                        :dense="$vuetify.breakpoint.name === 'xs'">
                        <template v-for="(labelGroup, alternativeIndex) in restaurantsMealsGroupedByLabel[restaurantIndex].alternativesDishesPricesGroupedByLabel">
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
    </section>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import { RestaurantMealsGroupedByLabel } from '../models/RestaurantMealsGroupedByLabel';
import { AlternativeLabelDishPrice } from '../dto/AlternativeLabelDishPrice';
import { AlternativesDishesPricesGroupedByLabel } from '../models/AlternativesDishesPricesGroupedByLabel';
import _, { groupBy } from 'lodash';
@Component
export default class RestaurantsDishes extends Vue {
    @Prop() restaurantsMealsDay!: RestaurantMealsDay[];
    private restaurantsMealsGroupedByLabel: RestaurantMealsGroupedByLabel[] = new Array<RestaurantMealsGroupedByLabel>();

    private async getSortedRestaurantMealsAsync(): Promise<RestaurantMealsDay[]> {
        // sorts restaurants-meals alphabetically based on the following conditions
        // 1) restaurant name
        // 2) label name
        const sortedRestaurantMealsPromise: Promise<RestaurantMealsDay[]> = new Promise( (resolve, reject) => {
            try {
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
                resolve(sortedRestaurantMeals);
            } catch (e) {
                reject(e);
            } 
        });
        
        return sortedRestaurantMealsPromise;
      }

      private async getRestaurantMealsGroupedByLabelAsync(
          sortedRestaurantMeal: RestaurantMealsDay): Promise<RestaurantMealsGroupedByLabel> {
          
        
        const restaurantMealsGroupedByLabelPromise: Promise<RestaurantMealsGroupedByLabel> = new Promise( (resolve, reject) => {
            try {
                const restaurantName = sortedRestaurantMeal.restaurantName;
                const restaurantMenuUrl = sortedRestaurantMeal.restaurantMenuUrl;
                
                const alternativesDishesPricesGroupedByLabel =
                    _(sortedRestaurantMeal.alternativeLabelDishPrices)
                .groupBy( (r) => { return r.labelName })            
                    .map( (value, key) => {  
                        const a = new AlternativesDishesPricesGroupedByLabel( key, value );
                        return a })
                    .value();

                const restaurantMealsGroupedByLabel = new RestaurantMealsGroupedByLabel(restaurantName, restaurantMenuUrl,alternativesDishesPricesGroupedByLabel)
                resolve(restaurantMealsGroupedByLabel);
            } catch (e) {
                reject(e);
            }
        });
        return restaurantMealsGroupedByLabelPromise;
      }

    @Watch('restaurantsMealsDay')
    private async restaurantsMealsDayChanged(): Promise<void> {
        const sortedRestaurantMeals = await this.getSortedRestaurantMealsAsync();
        this.restaurantsMealsGroupedByLabel =
            await Promise.all(
                sortedRestaurantMeals.map( async (m) => {
                    const restaurantMealsGroupedByLabel = await this.getRestaurantMealsGroupedByLabelAsync(m);
                    return restaurantMealsGroupedByLabel;
                })
            );
    }
    private async created(): Promise<void> {
        await this.restaurantsMealsDayChanged();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hide-link-style {
        text-decoration: none;
    } 
    /*   
    .restaurant-card-table >>> button {
        display: none;
    }
    */
    @media screen and (max-width: 600px) {
        .restaurant-card {
            margin-bottom: 0.4rem;
            max-width: 500px
        }
        .coulumn-configuration {

        }
    }
    @media screen and (min-width: 601px) {
        .restaurant-card {
            margin-bottom: 0.4rem;
            display: inline-block;
            width: 100%;
        }
        .coulumn-configuration {
            column-count: 2;
            column-gap: 1rem;
        }
    }
</style>
