import Vue from 'vue';
import Vuex from 'vuex';

import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';
import { Area } from '@/dto/repository/entities/Area';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        availableAreas: Array<Area>(),
        currentRestaurantsMealsDays: Array<RestaurantMealsDay>(),
        userHasAllowedLocalStorage: false,
        userSelectedAreas: Array<Area>(),
    },
    mutations: {
        ADD_USER_SELECTED_AREA(state, area: Area) { // addUserSelectedArea
            state.userSelectedAreas.push(area);
        },
        REMOVE_USER_SELECTED_AREA(state, area: Area) { // removeUserSelectedArea
            const updatedUserSelectedAreas = state.userSelectedAreas.filter( (a) => {
                const keepArea = a.id === area.id;
                return keepArea;
            });

            state.userSelectedAreas = updatedUserSelectedAreas;
        },
        GET_USER_HAS_ALLOWED_LOCAL_STORAGE(state) {
            // Check if the ID exists
            debugger;
            if (localStorage.getItem('userHasAllowedLocalStorage')) {
                // Replace the state object with the stored item
                this.replaceState(
                    Object.assign(state.userHasAllowedLocalStorage, JSON.parse(localStorage.getItem('userHasAllowedLocalStorage') || '')),
                );
            }
        },
        SET_USER_HAS_ALLOWED_LOCAL_STORAGE(state, value) {
            const userHasAllowedLocalStorage = JSON.parse(value);
            debugger;
            state.userHasAllowedLocalStorage = userHasAllowedLocalStorage;
            localStorage.setItem('userHasAllowedLocalStorage', JSON.stringify(userHasAllowedLocalStorage));
        },
    },
    actions: {
        setUserHasAllowedLocalStorage(context, value) {
            // https://medium.com/vue-mastery/vuex-intro-tutorial-course-38ca0bca7ef4
            context.commit('SET_USER_HAS_ALLOWED_LOCAL_STORAGE', value);
        },
    },
    getters: {
        getUserHasAllowedLocalStorage(state) {
            debugger;
            
          return state.userHasAllowedLocalStorage;
        },

    },
});

