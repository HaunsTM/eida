<template>
    <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-card-text>
      <div>sulten.se</div>
      <p class="display-1 text--primary">
        Hur funkar det?
      </p>
      <div class="text--primary">
        1) Klicka på symbolen för inställningar ("hamburgermenyn") i verktygsfältet ovan.<br />
        2) Bocka för de områden du vill se. 
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HowToInfo extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
