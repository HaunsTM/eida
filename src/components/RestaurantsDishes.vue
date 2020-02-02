<template>

    <section>
        <div class="coulumn-configuration" v-if="restaurantsMealsGroupedByLabel.length > 0">            
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
                                    <th>
                                        <img
                                            :src="getLabelImageAndNameDescription(labelGroup.labelName).imgSrc"
                                            :alt="getLabelImageAndNameDescription(labelGroup.labelName).nameDescription"
                                            class="label-image"/>
                                    </th>
                                    <th>
                                        <span class="title">{{getLabelImageAndNameDescription(labelGroup.labelName).nameDescription}}</span>
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody :key="labelGroup.labelName">
                                <tr v-for="alternative in labelGroup.alternativesDishesPrices" :key="alternative.dishDescription">
                                    <td colspan="2"><span class="caption">{{ replaceInvalidCharactersInDescription(alternative.dishDescription) }}</span></td>
                                    <td>{{ alternative.priceSEK > 0 ? +alternative.priceSEK + ":-" : "*PRIS SAKNAS*"  }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>                
            </v-card>
        </div>
        
        <div class="coulumn-configuration" v-else>
            <NoMealsForSelectedAreaThisDay />
        </div>
    </section>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import NoMealsForSelectedAreaThisDay from '@/components/NoMealsForSelectedAreaThisDay.vue';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import { RestaurantMealsGroupedByLabel } from '../models/RestaurantMealsGroupedByLabel';
import { AlternativeLabelDishPrice } from '../dto/AlternativeLabelDishPrice';
import { AlternativesDishesPricesGroupedByLabel } from '../models/AlternativesDishesPricesGroupedByLabel';
import _, { groupBy } from 'lodash';


import { LabelImageAndNameDescription } from '../models/LabelImageAndNameDescription';
import { LabelName } from '../enum/LabelName';
@Component({
    components: {
        NoMealsForSelectedAreaThisDay
    },
})
export default class RestaurantsDishes extends Vue {
    @Prop() restaurantsMealsDay!: RestaurantMealsDay[];
    private restaurantsMealsGroupedByLabel: RestaurantMealsGroupedByLabel[] = new Array<RestaurantMealsGroupedByLabel>();

    private replaceInvalidCharactersInDescription(unfiltered: string): string {
        const reg = new RegExp(String.fromCharCode(160), "g");
        const filteredString = unfiltered.replace(reg, " ");
        return filteredString;
    }
    private getLabelImageAndNameDescription(labelNameString: LabelName): LabelImageAndNameDescription {
        const labelName = labelNameString as LabelName;
        const dishImgBaseUrl = 'images/dishes/';
        let imgSrc: string = dishImgBaseUrl;
        let nameDescriptionSE = 'NO SWEDISH DESCRIPTION';
        
        switch (labelName) {

            case LabelName.ARABIC:
                imgSrc = 'arabic.png';
                nameDescriptionSE = 'Arabiskt';
                break;
            case LabelName.ASIAN:
                imgSrc = 'asian.png';
                nameDescriptionSE = 'Asiatiskt';
                break;
            case LabelName.BARBACUE:
                imgSrc = 'barbacue.png';
                nameDescriptionSE = 'BBQ';
                break;
            case LabelName.BREAD:
                imgSrc = 'bread.png';
                nameDescriptionSE = 'Bröd';
                break;
            case LabelName.BREAKFAST:
                imgSrc = 'breakfast.png';
                nameDescriptionSE = 'Frukost';
                break;
            case LabelName.CAKE:
                imgSrc = 'cake.png';
                nameDescriptionSE = 'Kaka';
                break;
            case LabelName.CHINESE:
                imgSrc = 'chinese.png';
                nameDescriptionSE = 'Kinesiskt';
                break;
            case LabelName.COFFEE:
                imgSrc = 'coffee.png';
                nameDescriptionSE = 'Kaffe o Te';
                break;
            case LabelName.DESSERT:
                imgSrc = 'dessert.png';
                nameDescriptionSE = 'Efterrätt';
                break;
            case LabelName.DRINK:
                imgSrc = 'drink.png';
                nameDescriptionSE = 'Drinkar';
                break;
            case LabelName.FALAFEL:
                imgSrc = 'falafel.png';
                nameDescriptionSE = 'Falafel';
                break;
            case LabelName.FAST_FOOD:
                imgSrc = 'fast_food.png';
                nameDescriptionSE = 'Snabbmat';
                break;
            case LabelName.FISH_AND_SEAFOOD:
                imgSrc = 'fish_and_seafood.png';
                nameDescriptionSE = 'Fisk o skaldjur';
                break;
            case LabelName.GRATIN:
                imgSrc = 'gratin.png';
                nameDescriptionSE = 'Gratäng';
                break;
            case LabelName.HOTPOT:
                imgSrc = 'hotpot.png';
                nameDescriptionSE = 'Gryta';
                break;
            case LabelName.INDIAN:
                imgSrc = 'indian.png';
                nameDescriptionSE = 'Indiskt';
                break;
            case LabelName.JAPANESE:
                imgSrc = 'japanese.png';
                nameDescriptionSE = 'Japanskt';
                break;
            case LabelName.MAIN:
                imgSrc = 'main.png';
                nameDescriptionSE = 'Huvudrätt';
                break;
            case LabelName.MEAL_OF_THE_DAY:
                imgSrc = 'meal_of_the_day.png';
                nameDescriptionSE = 'Dagens rätt';
                break;
            case LabelName.MEAT:
                imgSrc = 'meat.png';
                nameDescriptionSE = 'Kött';
                break;
            case LabelName.PERSIAN:
                imgSrc = 'persian.png';
                nameDescriptionSE = 'Persiskt';
                break;
            case LabelName.PIE:
                imgSrc = 'pie.png';
                nameDescriptionSE = 'Paj';
                break;
            case LabelName.PIZZA:
                imgSrc = 'pizza.png';
                nameDescriptionSE = 'Pizza';
                break;
            case LabelName.PLAIN:
                imgSrc = 'plain.png';
                nameDescriptionSE = 'Vanlig';
                break;
            case LabelName.PORK:
                imgSrc = 'pork.png';
                nameDescriptionSE = 'Fläsk';
                break;
            case LabelName.POULTRY:
                imgSrc = 'poultry.png';
                nameDescriptionSE = 'Fågel';
                break;
            case LabelName.SALAD:
                imgSrc = 'salad.png';
                nameDescriptionSE = 'Sallad';
                break;
            case LabelName.SANDWICH:
                imgSrc = 'sandwich.png';
                nameDescriptionSE = 'Smörgås';
                break;
            case LabelName.SMOOTHIE:
                imgSrc = 'smoothie.png';
                nameDescriptionSE = 'Smoothie';
                break;
            case LabelName.SNACK:
                imgSrc = 'snack.png';
                nameDescriptionSE = 'Snacks';
                break;
            case LabelName.SNACKS:
                imgSrc = 'snacks.png';
                nameDescriptionSE = 'Skräpmat';
                break;
            case LabelName.SOUP:
                imgSrc = 'soup.png';
                nameDescriptionSE = 'Soppa';
                break;
            case LabelName.STARTER:
                imgSrc = 'starter.png';
                nameDescriptionSE = 'Förrätt';
                break;
            case LabelName.SUSHI:
                imgSrc = 'sushi.png';
                nameDescriptionSE = 'Sushi';
                break;
            case LabelName.SUPPER:
                imgSrc = 'supper.png';
                nameDescriptionSE = 'Kväll';
                break;
            case LabelName.THAI:
                imgSrc = 'thai.png';
                nameDescriptionSE = 'Thai';
                break;
            case LabelName.VEGETARIAN:
                imgSrc = 'vegetarian.png';
                nameDescriptionSE = 'Vegetariskt';
                break;

        }

        const labelImageAndNameDescription = new LabelImageAndNameDescription(dishImgBaseUrl + imgSrc, nameDescriptionSE);
        return labelImageAndNameDescription;
    }
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
            } catch ( e ) {
                reject( e );
            } 
        });
        
        return sortedRestaurantMealsPromise;
      }

      private async getRestaurantMealsGroupedByLabelAsync(
          sortedRestaurantMeal: RestaurantMealsDay): Promise<RestaurantMealsGroupedByLabel> {

        const restaurantMealsGroupedByLabelPromise: Promise<RestaurantMealsGroupedByLabel> =
            new Promise( (resolve, reject) => {
                try {
                    const restaurantName = sortedRestaurantMeal.restaurantName;
                    const restaurantMenuUrl = sortedRestaurantMeal.restaurantMenuUrl;
                    
                    const alternativesDishesPricesGroupedByLabel =
                        _(sortedRestaurantMeal.alternativeLabelDishPrices)
                    .groupBy( ( r ) => { return r.labelName })
                        .map( ( value, key ) => { 
                            const a = new AlternativesDishesPricesGroupedByLabel( key, value );
                            return a; })
                        .value();

                    const restaurantMealsGroupedByLabel =
                        new RestaurantMealsGroupedByLabel(
                            restaurantName, restaurantMenuUrl, alternativesDishesPricesGroupedByLabel);

                    resolve( restaurantMealsGroupedByLabel );
                } catch ( e ) {
                    reject( e );
                }
            },
        );
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
                }),
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
        .label-image {
            width: 24px;
            display: inline-block;
        }
        .coulumn-configuration {
            column-count: 1;
        }
    }
    @media screen and (min-width: 601px) {
        .restaurant-card {
            margin-bottom: 0.4rem;
            display: inline-block;
            width: 100%;
        }
        .label-image {
            width: 36px;
            display: inline-block;
        }
        .coulumn-configuration {
            column-count: 2;
            column-gap: 1rem;
        }
    }
</style>
