<template>
    <section>
        <article
            v-for="restaurantMealsDay in restaurantsMealsDay"
            v-bind:key="restaurantMealsDay.restaurantMenuUrl">

            <h1>{{restaurantMealsDay.restaurantName}}</h1>
            <v-data-table 
                :headers="headers" 
                :items="desserts" 
                hide-default-footer
                item-key="name" 
                group-key="category" 
                group-expanded>

            <template slot="group" slot-scope="props">
              <span class="font-weight-bold">
                Group {{props.groupIndex + 1}} - {{props.groupName}}
              </span>
            </template>

            <template slot="items" slot-scope="props">
              <tr>
                <td>{{ props.item.labelName }}</td>
                <td>{{ props.item.dishDescription }}</td>
                <td>{{ props.item.priceSEK }}</td>
              </tr>
            </template>

          </v-data-table>

            
        </article>
    </section>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';

@Component
export default class RestaurantsDishes extends Vue {
    @Prop() restaurantsMealsDay!: RestaurantMealsDay[];

      private readonly headers = [
        { text: "", value: "labelName" },
        { text: "Rätt", value: "dishDescription" },
        { text: "Pris (kr)", value: "priceSEK" },
      ];
            private readonly desserts = [
        {
          value: false,
          category: "Kolga",
          labelName: "Dagens",
          dishDescription: "Rotmos",
          priceSEK: 100,
        },
        {
          value: false,
          category: "Kolga",
          labelName: "Vegetariskt",
          dishDescription: "Rotmos",
          priceSEK: 95,
        },
        {
          value: false,
          category: "MMH",
          labelName: "Vegetariskt",
          dishDescription: "Sallad",
          priceSEK: 95,
        },
      ];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
