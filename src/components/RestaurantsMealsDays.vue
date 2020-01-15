<template>
   <v-tabs grow v-model="active_tab">
     <v-tab
      v-for="tab of tabs"
      :key="tab.index"
     >
     {{tab.name}}
     </v-tab>
   </v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RestaurantsMealsDays extends Vue {
    @Prop() private msg!: string;
    data: any = () => ({
      active_tab: 2,
      tabs: [
        { index: 0, name: 'tab1' },
        { index: 1, name: 'tab2' },
        { index: 2, name: 'tab3' },
      ],
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
