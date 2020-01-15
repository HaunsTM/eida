<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <RestaurantsMealsDays msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import RestaurantsMealsDays from '@/components/RestaurantsMealsDays.vue'

export default {
  name: 'home',
  components: {
    RestaurantsMealsDays
  }
}
</script>
