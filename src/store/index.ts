import Vue from 'vue';
import Vuex from 'vuex';

import { RestaurantMealDay } from '../dto/RestaurantMealDay';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentRestaurantsMealsDays: new Array<RestaurantMealDay>(),
  },
  mutations: {
    setRestaurantsMealsDays(state, current: RestaurantMealDay[] )  {
        state.currentRestaurantsMealsDays = current;
    },
  },
  actions: {
  },
  modules: {
  },
});

