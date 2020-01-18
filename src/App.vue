<template>
  <div id="app">
    <v-app id="inspire">
        <v-navigation-drawer
            v-model="showMenu"
            app
            >
            <AreasListDrawer v-bind:allAreas="allAreas" v-bind:selectedAreas="selectedAreas" @update-selected-areas="updateSelectedAreas" />

        </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="toggleMenu" />
      <v-toolbar-title>Välkommen till sulten.se</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
              {{selectedAreas}}
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer
        color="indigo"
        app
        >
        <span class="white--text">sulten.se - 2020</span>
    </v-footer>

  </v-app>

    
  </div>
</template>

<script lang="ts">
import { Area } from './dto/repository/entities/Area';
import AreasListDrawer from './components/AreasListDrawer.vue';
import { Component, Vue } from 'vue-property-decorator';
import DataService from './api/DataService';
import moment from 'moment';

@Component({
  components: {
    AreasListDrawer
  }
})export default class App extends Vue {
    allAreas: Array<Area> = new Array<Area>();
    selectedAreas: Array<Area> = new Array<Area>();
    showMenu: boolean = false;
    
    toggleMenu(): void {
      this.showMenu = !this.showMenu;
    }

    private currentWeekNumber(): number {
        const currentWeekNumber = moment().isoWeek();

        return currentWeekNumber;
    }

    async beforeCreate() {
        const ds = new DataService();
        this.allAreas = await ds.allAreas();
        const mealsPerAreaWeekYear = await ds.mealsPerAreaWeekYear(2, 3, 2020);
        const mealsPerAreaDayWeekYear = await ds.mealsPerAreaDayWeekYear(2, 5, 3, 2020);
        const restaurantsPerArea = await ds.restaurantsPerArea(2);


        const i = 1;
    }
    updateSelectedAreas(selectedAreas: Array<Area>) {
        // https://medium.com/javascript-in-plain-english/avoid-mutating-a-prop-directly-7b127b9bca5b
        this.selectedAreas = selectedAreas;
    }
}
</script>

<style>
</style>
