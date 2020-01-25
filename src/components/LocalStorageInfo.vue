<template>
    <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-card-text>
      <div>sulten.se</div>
      <p class="display-1 text--primary">
        Medgivande
      </p>
      <div class="text--primary">
        För att sidan ska fungera måste webbläsaren få tillstånd att lagra de inställningar som du gör här på sulten.se. Godkänner du detta?
      </div>
    </v-card-text>
<v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
        v-on:click="onUserHasAllowedLocalStorage"
      >
        JA
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LocalStorageInfo extends Vue {

    private onUserHasAllowedLocalStorage(): void {
        this.$emit('user-has-allowed-local-storage', true);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
