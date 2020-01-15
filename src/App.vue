<template>
  <div id="app">
    
    <v-app>

<!-- Start of Navigation -->
    <nav>
      <!-- Start of app toolbar -->
      <v-toolbar app>
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-toolbar-side-icon>
        <v-toolbar-title class="headline text-uppercase"
          >Vuetify Demo</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/" exact>Home</v-btn>
          <v-btn flat to="/about">About</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <!-- End of app toolbar -->


    </nav>
    <!-- End of Navigation -->

      <v-content>
          <!-- route outlet -->
          <!-- component matched by the route will render here -->
          <router-view></router-view>
      </v-content>
    </v-app>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
