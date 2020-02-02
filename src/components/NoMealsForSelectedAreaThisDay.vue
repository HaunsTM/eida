<template>
    <v-card
        class="mx-auto"
        outlined
        >
        <v-card-text>
        <div>sulten.se</div>
            <p class="display-1 text--primary">
            Inget att äta i det här området?
            </p>
            <div class="text--primary">
            Idag verkar det faktiskt inte som om någon restaurang serverar dagens rätt här.<br />
            <br />
            Det finns kanske a la carte? Kanske prova en annan dag?
        </div>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NoMealsForSelectedAreaThisDay extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
