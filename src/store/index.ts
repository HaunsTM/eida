import Vue from 'vue';
import Vuex from 'vuex';

import DataService from '../api/DataService';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import { Area } from '@/dto/repository/entities/Area';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // area
        availableAreas: Array<Area>(),
        userSelectedAreas: Array<Area>(),

        // local storage
        userHasAllowedLocalStorage: false,

        // restaurantsMealsDays
        currentRestaurantsMealsDays: Array<RestaurantMealsDay>(),

        // time
        userSelectedWeekNumber: -1,
    },
    mutations: {
        // area
        SET_USER_SELECTED_AREAS(state, areas: Area[]): void { // addUserSelectedArea
            state.userSelectedAreas = areas;
        },
        SET_AVALIABLE_AREAS(state, availableAreas: Area[]): void {
            state.availableAreas = availableAreas;
        },

        // local storage
        GET_USER_HAS_ALLOWED_LOCAL_STORAGE(state): void {
            // Check if the ID exists
            if (localStorage.getItem('userHasAllowedLocalStorage')) {
                // Replace the state object with the stored item
                state.userHasAllowedLocalStorage = JSON.parse(localStorage.getItem('userHasAllowedLocalStorage') || '');
            }
        },
        SET_USER_HAS_ALLOWED_LOCAL_STORAGE(state, value: boolean) {
            const userHasAllowedLocalStorage = JSON.parse(value.toString());
            state.userHasAllowedLocalStorage = userHasAllowedLocalStorage;
            localStorage.setItem('userHasAllowedLocalStorage', JSON.stringify(userHasAllowedLocalStorage));
        },

        // time
        SET_USER_SELECTED_WEEK_NUMBER(state, weekNumberIndex: number) {
            state.userSelectedWeekNumber = weekNumberIndex;
        },
    },
    actions: {
        init(context) {
            context.commit('GET_USER_HAS_ALLOWED_LOCAL_STORAGE');
            context.dispatch('fetchAvailableAreas');
        },

        // area
        async fetchAvailableAreas(context): Promise<void> {
            const ds = new DataService();
            const availableAreas = await ds.allAreas();

            context.commit('SET_AVALIABLE_AREAS', availableAreas);
        },
        setUserSelectedAreas(context, areas: Area[]) {
            // https://medium.com/vue-mastery/vuex-intro-tutorial-course-38ca0bca7ef4
            context.commit('SET_USER_SELECTED_AREAS', areas);
        },

        // local storage
        setUserHasAllowedLocalStorage(context, value: boolean) {
            // https://medium.com/vue-mastery/vuex-intro-tutorial-course-38ca0bca7ef4
            context.commit('SET_USER_HAS_ALLOWED_LOCAL_STORAGE', value);
        },

        // time
        setUserSelectedWeekNumber(context, weekNumber: number) {
            context.commit('SET_USER_SELECTED_WEEK_NUMBER', weekNumber);
        },


    },
    getters: {
        // area
        getAvailableAreas(state): Area[] {
          return state.availableAreas;
        },

        // local storage
        getUserHasAllowedLocalStorage(state): boolean {
          return state.userHasAllowedLocalStorage;
        },

        // time
        getUserSelectedWeekNumber(state, weekNumber: number): number {
            return state.userSelectedWeekNumber;
        },

    },
});

