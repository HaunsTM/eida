<template>
  <div id="app">
    <v-app id="inspire">
        <v-navigation-drawer
            v-model="showMenu"
            app
            >
            <v-list dense>
                <v-list-item-group
                    v-model="selectedAreas"
                    multiple
                >
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>mdi-chef-hat</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Område</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <template v-for="(item, i) in allAreas">

                        <v-list-item
                            :key="item.id"
                            :value="item"
                            active-class="deep-purple--text text--accent-4"
                        >
                            <template v-slot:default="{ active, toggle }">
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.name"></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-checkbox
                                        :input-value="active"
                                        :true-value="item"
                                        color="deep-purple accent-4"
                                        @click="toggle"
                                    ></v-checkbox>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>

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
import { Component, Vue } from 'vue-property-decorator';
import DataService from './api/DataService';
import moment from 'moment';

@Component
export default class App extends Vue {
    allAreas: Array<Area> = new Array<Area>();
    selectedAreas: Array<Area> = new Array<Area>();
    showMenu: boolean = false;

    toggleMenu(): void {
      this.showMenu = !this.showMenu;
    }
    data() {
        return {

        }
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
}
</script>

<style>
</style>
