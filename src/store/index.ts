import Vue from 'vue';
import Vuex from 'vuex';

import { RestaurantMealsDay } from '../dto/RestaurantMealsDay';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentRestaurantsMealsDays: new Array<RestaurantMealsDay>(),
  },
  mutations: {
    setRestaurantsMealsDays(state, current: RestaurantMealsDay[] )  {
        state.currentRestaurantsMealsDays = current;
    },
  },
  actions: {
  },
  modules: {
  },
});

