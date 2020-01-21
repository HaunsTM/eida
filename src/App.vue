<template>
  <div id="app">
        <v-app id="inspire">

            <v-navigation-drawer
                v-model="showMenu"
                app>
                <AreasListDrawer v-bind:allAreas="allAreas" v-bind:selectedAreas="selectedAreas" @update-selected-areas="updateSelectedAreas" />

            </v-navigation-drawer>

            <v-app-bar
                app
                color="indigo"
                dark>
                <v-app-bar-nav-icon @click.stop="toggleMenu" />
                <v-toolbar-title>Vad är du sugen på idag?</v-toolbar-title>
            </v-app-bar>
            
            <!-- Sizes your content based upon application components -->
            <v-content>

                <!-- Provides the application the proper gutter -->
                <v-container fluid>

                    <!-- If using vue-router -->
                    <router-view></router-view>

                </v-container>

            </v-content>

            <v-footer
                color="indigo"
                app>
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
import { mapState, mapMutations, mapActions } from 'vuex'

@Component({
  components: {
    AreasListDrawer
  }
})
export default class App extends Vue {
    allAreas: Array<Area> = new Array<Area>();
    selectedAreas: Array<Area> = new Array<Area>();
    showMenu: boolean = false;
    
    private toggleMenu(): void {
      this.showMenu = !this.showMenu;
    }

    private currentWeekNumber(): number {
        const currentWeekNumber = moment().isoWeek();

        return currentWeekNumber;
    }

    private async beforeCreate() {
        const ds = new DataService();
        this.allAreas = await ds.allAreas();
        const mealsPerAreaWeekYear = await ds.mealsPerAreaWeekYear(2, 3, 2020);
        const mealsPerAreaDayWeekYear = await ds.mealsPerAreaDayWeekYear(2, 5, 3, 2020);
        const restaurantsPerArea = await ds.restaurantsPerArea(2);

        this.$store.commit('setRestaurantsMealsDays', mealsPerAreaWeekYear)
        const i = 1;
    }
    private updateSelectedAreas(selectedAreas: Array<Area>) {
        // https://medium.com/javascript-in-plain-english/avoid-mutating-a-prop-directly-7b127b9bca5b
        this.selectedAreas = selectedAreas;

    }

    /*
    get selectedAreas(): Array<Area> {
        const tempSelectedAreas = localStorage.getItem('selectedAreas');
        const selectedAreas = tempSelectedAreas ? JSON.parse(tempSelectedAreas) : new Array<Area>();
        debugger;
        return selectedAreas;
    }
    set selectedAreas(value: Array<Area>) {
        localStorage.setItem('selectedAreas', JSON.stringify(value));
    }
    */
   
}
</script>

<style>
</style>
