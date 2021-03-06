<template>
  <div id="app">
        <v-app id="inspire">

            <v-navigation-drawer
                v-model="showMenu"
                app>
                <AreasListDrawer />
                    
                <v-divider></v-divider>
                <v-list
                    subheader
                    dense
                    >
                    <v-subheader>Meta</v-subheader>

                    <v-list-item-group>
                        
                        <v-list-item to="/about" link>
                            <v-list-item-action>
                                <v-icon>mdi-information</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>About...</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>

            <v-app-bar
                app
                color="indigo"
                dark>
                <v-app-bar-nav-icon v-if="userHasAllowedLocalStorage" @click.stop="toggleMenu" />
                <v-toolbar-title class="hidden-xs-only">Äta vecka {{currentWeekNumber}}, {{currentYear}} - Vad är du sugen på idag?</v-toolbar-title>
                <v-toolbar-title class="hidden-sm-and-up">Matsedlar v. {{currentWeekNumber}}, {{currentYear}}</v-toolbar-title>
            </v-app-bar>
            
            <!-- Sizes your content based upon application components -->
            <v-content>

                <!-- Provides the application the proper gutter -->
                <v-container fluid>
                    <v-row align="start" justify="center">
                        <v-col cols="12">
                            <div v-if="userHasAllowedLocalStorage">
                                <div v-if="userSelectedAreas.length > 0">
                                    <router-view></router-view>
                                </div>
                                <div v-else>
                                    <HowToInfo />
                                </div>
                            </div>
                            <div v-else>
                                <LocalStorageInfo v-on:user-has-allowed-local-storage="onUserHasAllowedLocalStorage"/>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-content>

            <v-footer
                color="indigo"
                app>
                <div class="d-flex justify-space-between">                    
                    <div class="white--text"><i>Eid mé sulten pongkt ess ei!</i> </div>
                    <div class="white--text"> - sulten.se</div>
                </div>
            </v-footer>

        </v-app>

    </div>
</template>

<script lang="ts">
import { Area } from './dto/repository/entities/Area';
import AreasListDrawer from './components/AreasListDrawer.vue';
import HowToInfo from './components/HowToInfo.vue';
import { Component, Vue } from 'vue-property-decorator';
import DataService from './api/DataService';
import LocalStorageInfo from './components/LocalStorageInfo.vue';
import moment from 'moment';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

@Component({
    components: {
        AreasListDrawer,
        HowToInfo,
        LocalStorageInfo,
    },
    computed: {
        ...mapGetters({
            userHasAllowedLocalStorage: 'getUserHasAllowedLocalStorage',
            userSelectedAreas: 'getUserSelectedAreas',

            currentWeekNumber: 'getCurrentWeekNumber',
            currentYear: 'getCurrentYear',
        }),
    },
})
export default class App extends Vue {
    private showMenu: boolean = false;

    private currentWeekNumber!: number;
    private currentYear!: number;

    private toggleMenu(): void {
      this.showMenu = !this.showMenu;
    }
    private get userSelectedAreas(): Area[] {
        return this.$store.getters.getUserSelectedAreas;
    }
    private get userHasAllowedLocalStorage(): boolean {
        return this.$store.getters.getUserHasAllowedLocalStorage;
    }
    private onUserHasAllowedLocalStorage(value: boolean): void {
        this.$store.dispatch('setUserHasAllowedLocalStorage', value);
    }    
}
</script>

<style>
    @media screen and (max-width: 600px) {
        .coulumn-configuration {
            column-count: 1;
        }
    }
    @media screen and (min-width: 601px) {
        .coulumn-configuration {
            column-count: 2;
            column-gap: 1rem;
        }
    }
</style>
