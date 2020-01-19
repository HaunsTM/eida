<template>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RestaurantMealDay } from '../dto/RestaurantMealDay';

@Component
export default class RestaurantDish extends Vue {
    @Prop({default: new Array<RestaurantMealDay>()}) mealsPerAreaWeekYear!: Array<RestaurantMealDay>;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
