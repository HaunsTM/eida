<template>
  <div id="app">
    
    <v-app>
<!-- Start of Navigation -->
    <nav>
      <!-- Start of app toolbar -->
      <v-toolbar app>
        
        <v-toolbar-title class="headline text-uppercase"
          >Vuetify Demo</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/" exact>Home</v-btn>
          <v-btn flat to="/about">About</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <!-- End of app toolbar -->


    </nav>
    <!-- End of Navigation -->

      <v-content>
          <!-- route outlet -->
          <!-- component matched by the route will render here -->
          <router-view></router-view>
      </v-content>

    </v-app>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Area } from './dto/repository/entities/Area';
import { AreaRestaurants } from './dto/AreaRestaurants';
import { RestaurantMeal } from './dto/RestaurantMeal';
import { RestaurantMealDay } from './dto/RestaurantMealDay';
import axios from 'axios';
import moment from 'moment';

@Component
export default class App extends Vue {

    private readonly baseURL = 'https://api.sulten.se';

    // Lifecycle hook
    private async allAreas(): Promise<Array<Area>>  {

            
        const result = await axios.get(`${this.baseURL}/menu/allAreas`);
        const allAreas: Array<Area> = JSON.parse(JSON.stringify(result.data));

        return allAreas;
    }
    private async mealsPerAreaWeekYear(areaId: number, weekNumber: number, weekYear: number): Promise<Array<RestaurantMealDay>>  {
debugger;
        const result = await axios.get(`${this.baseURL}/menu/mealsPerAreaWeekYear/${areaId}/${weekNumber}/${weekYear}`);
        const mealsPerAreaWeekYear: Array<RestaurantMealDay> = JSON.parse(JSON.stringify(result.data));

        return mealsPerAreaWeekYear;
    }
    private async mealsPerAreaDayWeekYear(areaId: number, dayIndex: number, weekNumber: number, weekYear: number): Promise<Array<RestaurantMeal>>  {

        const result = await axios.get(`${this.baseURL}/menu/mealsPerAreaDayWeekYear/${areaId}/${dayIndex}/${weekNumber}/${weekYear}`);
        const mealsPerAreaDayWeekYear: Array<RestaurantMeal> = JSON.parse(JSON.stringify(result.data));

        return mealsPerAreaDayWeekYear;
    }
    private async restaurantsPerArea(areaId: number): Promise<Array<AreaRestaurants>>  {

        const result = await axios.get(`${this.baseURL}/menu/restaurantsPerArea/${areaId}`);
        const restaurantsPerArea: Array<AreaRestaurants> = JSON.parse(JSON.stringify(result.data));

        return restaurantsPerArea;
    }

    async mounted () {
    const allAreas = await this.allAreas();
    const mealsPerAreaWeekYear = await this.mealsPerAreaWeekYear(2,3,2020);
    const mealsPerAreaDayWeekYear = await this.mealsPerAreaDayWeekYear(2,5,3,2020);
    const restaurantsPerArea = await this.restaurantsPerArea(2);


    debugger;
    const i = 1;
    }
}
</script>

<style>
</style>
