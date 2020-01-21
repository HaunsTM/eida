<template>

    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="name"
      group-by="category"
      class="elevation-1"
      show-group-by
    ></v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';

@Component
export default class RestaurantDish extends Vue {
    @Prop() restaurantMealsDay!: RestaurantMealsDay;

      headers = [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          value: 'name'
        },
        { text: 'Category', value: 'category' },
      ];
      desserts = [
        {
          name: 'Frozen Yogurt',
          category: 'Ice cream',
        },
        {
          name: 'Ice cream sandwich',
          category: 'Ice cream',
        },
        {
          name: 'Eclair',
          category: 'Cookie',
        },
        {
          name: 'Cupcake',
          category: 'Pastry',
        },
        {
          name: 'Gingerbread',
          category: 'Cookie',
        },
        {
          name: 'Jelly bean',
          category: 'Candy',
        },
        {
          name: 'Lollipop',
          category: 'Candy',
        },
        {
          name: 'Honeycomb',
          category: 'Toffee',
        },
        {
          name: 'Donut',
          category: 'Pastry',
        },
        {
          name: 'KitKat',
          category: 'Candy',
        },
      ];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
