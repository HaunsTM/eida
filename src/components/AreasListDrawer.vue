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
            {{availableAreasPerUrbanAreas}}
            <template v-for="(currentUrbanAreaWithAreas, currentUrbanAreaWithAreasIndex) in availableAreasPerUrbanAreas">
                {{currentUrbanAreaWithAreas.urbanAreaName}}
                
                <template v-for="(currentArea, index) in currentUrbanAreaWithAreas.areas">
                    <v-list-item
                        :key="currentArea.id"
                        :value="currentArea.name"
                        active-class="deep-purple--text text--accent-4"
                    >
                        <template v-slot:default="{ active, toggle }">
                            <v-list-item-content>
                                <v-list-item-title v-text="currentArea.name"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-checkbox
                                    :input-value="active"
                                    :true-value="currentArea.id"
                                    color="deep-purple accent-4"
                                    @click="toggle"
                                ></v-checkbox>
                            </v-list-item-action>
                        </template>
                    </v-list-item>
                </template>
            </template>
        </v-list-item-group>
    </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Area } from '../dto/repository/entities/Area';
import { mapActions, mapGetters } from 'vuex';
import { UrbanAreaAreas } from '../dto/UrbanAreaAreas';


@Component({
  computed: {
        ...mapGetters({
        availableAreasPerUrbanAreas: 'getAvailableAreasPerUrbanAreas',
        userSelectedAreas: 'getUserSelectedAreas',
    }),
  },
})
export default class AreasListDrawer extends Vue {


    private get availableAreasPerUrbanAreas(): UrbanAreaAreas[] {
        const availableAreasPerUrbanAreas = this.$store.getters.getAvailableAreasPerUrbanAreas;
        debugger;
        return availableAreasPerUrbanAreas;
    }
    private get userSelectedAreasNames(): string[] {
        const userSelectedAreas = this.$store.getters.getUserSelectedAreas as Area[];
        const userSelectedAreasNames =
            userSelectedAreas
           .map( (a) => { return a as Area; })
           .map( (a) => { return a.name; });
        return userSelectedAreasNames;
    }
    private set userSelectedAreasNames(areaNames: string[]) {
        const userSelectedAreas =
            this.availableAreasPerUrbanAreas
            .filter( (a) => {
            debugger;
                const isIncluded = areaNames.includes(a.urbanAreaName);
                return isIncluded;
            });
        this.$store.dispatch('setUserSelectedAreas', userSelectedAreas);
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
