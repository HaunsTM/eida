<template>
    <section class="coulumn-configuration">
        <v-card class="instruction-card">
            <v-card-text>
                <p class="display-1 text--primary">
                    1. Klicka på symbolen för inställningar
                </p>
                <div class="text--primary">
                    <img
                        src="images/howTo/1.png"
                        class="instruction-image"/>
                </div>
            </v-card-text>
        </v-card>
        <v-card class="instruction-card">
            <v-card-text>
                <p class="display-1 text--primary">
                    2. Markera vad du vill se
                </p>
                <div class="text--primary">
                    <img
                        src="images/howTo/2.png"
                        class="instruction-image"/>
                </div>
            </v-card-text>
        </v-card>
        <v-card class="instruction-card">
            <v-card-text>
                <p class="display-1 text--primary">
                    3. Varsågod!
                </p>
                <div class="text--primary">
                    <img
                        src="images/howTo/3.png"
                        class="instruction-image"/>
                </div>
            </v-card-text>
        </v-card>
    </section>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HowToInfo extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .instruction-card {
        margin-bottom: 0.4rem;
        max-width: 500px
    }
    .instruction-image {
        display: inline-block;
        width: 200px;
    }
</style>
