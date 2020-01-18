<template>
<v-tabs
  background-color="transparent"
  color="basil"
  grow
>
  <v-tab>Tab 1</v-tab>
  <v-tab>Tab 2</v-tab>
  <v-tab>Tab 3</v-tab>

  <v-tab-item>
    <v-card flat color="basil">
      <v-card-text>
        First tab contents
      </v-card-text>
    </v-card>
  </v-tab-item>
  <v-tab-item>
    <v-card flat color="basil">
      <v-card-text>
        Second tab contents
      </v-card-text>
    </v-card>
  </v-tab-item>

  <v-tab-item>
    <v-card flat color="basil">
      <v-card-text>
        Third tab contents
      </v-card-text>
    </v-card>
  </v-tab-item>

</v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RestaurantsMealsDays extends Vue {
    @Prop() private msg!: string;
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
