import Vue from 'vue';
import Vuex from 'vuex';

import DataService from '../api/DataService';
import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import { UrbanAreaAreas } from '../dto/UrbanAreaAreas';
import { UserSelectedArea } from '../dto/repository/entities/UserSelectedArea';

import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // area
        availableAreasPerUrbanAreas: Array<UrbanAreaAreas>(),
        userSelectedAreas: Array<UserSelectedArea>(),

        // local storage
        userHasAllowedLocalStorage: false,

        // restaurantsMealsDays
        currentRestaurantsMealsDays: Array<RestaurantMealsDay>(),

        // time
        userSelectedWeekNumber: -1,
        currentWeekdayIndex: -1,
        currentWeekNumber: -1,
        currentYear: -1,
    },
    mutations: {
        // area
        GET_USER_SELECTED_AREAS(state): void {
            if (localStorage.getItem('userSelectedAreas')) {
                const userSelectedAreas= JSON.parse(localStorage.getItem('userSelectedAreas') || '') as UserSelectedArea[];                
                state.userSelectedAreas = userSelectedAreas;
            }
        },
        SET_USER_SELECTED_AREAS(state, userSelectedAreas: UserSelectedArea[]): void {
            state.userSelectedAreas = userSelectedAreas;
            localStorage.setItem('userSelectedAreas', JSON.stringify(userSelectedAreas));
        },

        SET_AVALIABLE_URBAN_AREA_AREAS(state, availableAreasPerUrbanAreas: UrbanAreaAreas[]): void {
            state.availableAreasPerUrbanAreas = availableAreasPerUrbanAreas;
        },

        // local storage
        GET_USER_HAS_ALLOWED_LOCAL_STORAGE(state): void {
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
        SET_CURRENT_WEEKDAY_INDEX(state) {
            const currentWeekdayIndex = moment().weekday();
            state.currentWeekdayIndex = currentWeekdayIndex;
        },
        SET_CURRENT_WEEK_NUMBER(state) {
            const currentWeekNumber = moment().isoWeek();
            state.currentWeekNumber = currentWeekNumber;
        },
        SET_CURRENT_YEAR(state) {
            const currentYear = moment().year();
            state.currentYear = currentYear;
        },
    },
    actions: {
        async init(context) {
            context.commit('GET_USER_HAS_ALLOWED_LOCAL_STORAGE');
            context.commit('GET_USER_SELECTED_AREAS');

            context.commit('SET_CURRENT_WEEKDAY_INDEX');
            context.commit('SET_CURRENT_WEEK_NUMBER');
            context.commit('SET_CURRENT_YEAR');

            await context.dispatch('fetchAllAreasPerUrbanAreas');
        },

        // area
        async fetchAllAreasPerUrbanAreas(context): Promise<void> {
            const ds = new DataService();
            const allAreasPerUrbanAreas = await ds.allAreasPerUrbanAreas();

            context.commit('SET_AVALIABLE_URBAN_AREA_AREAS', allAreasPerUrbanAreas);
        },
        setUserSelectedAreas(context, userSelectedAreas: UserSelectedArea[]) {
            // https://medium.com/vue-mastery/vuex-intro-tutorial-course-38ca0bca7ef4
            context.commit('SET_USER_SELECTED_AREAS', userSelectedAreas);
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
        getAvailableAreasPerUrbanAreas(state): UrbanAreaAreas[] {
            return state.availableAreasPerUrbanAreas;
        },
        getUserSelectedAreas(state): UserSelectedArea[] {
            return state.userSelectedAreas;
        },

        // local storage
        getUserHasAllowedLocalStorage(state): boolean {
          return state.userHasAllowedLocalStorage;
        },

        // time
        getUserSelectedWeekNumber(state): number {
            return state.userSelectedWeekNumber;
        },

        getCurrentWeekdayIndex(state): number {
            return state.currentWeekdayIndex;
        },

        getCurrentWeekNumber(state): number {
            return state.currentWeekNumber;
        },

        getCurrentYear(state): number {
            return state.currentYear;
        },

    },
});
