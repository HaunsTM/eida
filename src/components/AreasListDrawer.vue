<template>
    <v-list dense>
        <v-list-item-group
            v-model="userSelectedAreasNames"
            multiple
        >
            <v-list-item>
                <v-list-item-action>
                    <v-icon>mdi-chef-hat</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Område</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <template v-for="(item, index) in availableAreas">

                <v-list-item
                    :key="item.id"
                    :value="item.name"
                    active-class="deep-purple--text text--accent-4"
                >
                    <template v-slot:default="{ active, toggle }">
                        <v-list-item-content>
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-checkbox
                                :input-value="active"
                                :true-value="item.name"
                                color="deep-purple accent-4"
                                @click="toggle"
                            ></v-checkbox>
                        </v-list-item-action>
                    </template>
                </v-list-item>
            </template>
        </v-list-item-group>
    </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Area } from '../dto/repository/entities/Area';
import { mapActions, mapGetters } from 'vuex';


@Component({
  computed: {
        ...mapGetters({
        availableAreas: 'getAvailableAreas',
        userSelectedAreas: 'getUserSelectedAreas'
    }),
  },
})
export default class AreasListDrawer extends Vue {


    private get availableAreas(): Area[] {
        return this.$store.getters.getAvailableAreas;
    }
    private get userSelectedAreasNames(): string[] {
        const userSelectedAreas = this.$store.getters.getUserSelectedAreas as Area[];
        const userSelectedAreasNames =
            userSelectedAreas
           .map( (a) => {return a as Area})
           .map( (a) => { return a.name});
        return userSelectedAreasNames;
    }
    private set userSelectedAreasNames(areaNames: string[]) {
        const userSelectedAreas =
            this.availableAreas
            .filter( (a) => {
                const isIncluded = areaNames.includes(a.name);
                return isIncluded;
            });
        this.$store.dispatch('setUserSelectedAreas', userSelectedAreas);
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
