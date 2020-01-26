<template>
  <div id="app">
        <v-app id="inspire">

            <v-navigation-drawer
                v-model="showMenu"
                app>
                <AreasListDrawer />

            </v-navigation-drawer>

            <v-app-bar
                app
                color="indigo"
                dark>
                <v-app-bar-nav-icon v-if="userHasAllowedLocalStorage" @click.stop="toggleMenu" />
                <v-toolbar-title>Vad är du sugen på idag?</v-toolbar-title>
            </v-app-bar>
            
            <!-- Sizes your content based upon application components -->
            <v-content>

                <!-- Provides the application the proper gutter -->
                <v-container fluid>

                    <div v-if="userHasAllowedLocalStorage">

                        <router-view></router-view>

                    </div>
                    <div v-else>
                        <LocalStorageInfo v-on:user-has-allowed-local-storage="onUserHasAllowedLocalStorage"/>
                    </div>


                </v-container>

            </v-content>

            <v-footer
                color="indigo"
                app>
                <span class="white--text">Ät med sulten.se - vecka {{currentWeekNumber}} - {{currentYear}}</span>
            </v-footer>

        </v-app>

    </div>
</template>

<script lang="ts">
import { Area } from './dto/repository/entities/Area';
import AreasListDrawer from './components/AreasListDrawer.vue';
import { Component, Vue } from 'vue-property-decorator';
import DataService from './api/DataService';
import LocalStorageInfo from './components/LocalStorageInfo.vue';
import moment from 'moment';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

@Component({
    components: {
        AreasListDrawer,
        LocalStorageInfo,
    },
    computed: {
        ...mapGetters({
            userHasAllowedLocalStorage: 'getUserHasAllowedLocalStorage',
        }),
    },
})
export default class App extends Vue {
    private showMenu: boolean = false;

    private toggleMenu(): void {
      this.showMenu = !this.showMenu;
    }

    private get currentWeekNumber(): number {
        const currentWeekNumber = moment().isoWeek();

        return currentWeekNumber;
    }

    private get currentYear(): number {
        const currentYear = moment().year();

        return currentYear;
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
</style>
