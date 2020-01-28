<template>
    <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-card-text>
      <div>sulten.se</div>
      <p class="display-1 text--primary">
        Inga menyer?
      </p>
      <div class="text--primary">
          Det är inte ofta det händer men ibland saknas det menyer här på sulten.se. <br />
          <br />
          Det kan såklart finnas en mängd skäl till det men, troligast är att menyer
          ännu inte har hunnit bli inlästa från restaurangerna (synkronisering sker
          på måndagar kl 10). Eller så har restaurangmenyerna förändrats så att sulten.se inte kan hitta rätt.

          Håll ut!
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NoMealsForSelectedAreasYet extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
