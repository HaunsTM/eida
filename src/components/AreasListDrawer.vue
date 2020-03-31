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
                        :value="getAreaCheckBoxTrueValue(currentUrbanAreaWithAreas,currentArea)"
                        active-class="deep-purple--text text--accent-4"
                    >
                        <template v-slot:default="{ active, toggle }">
                            <v-list-item-content>
                                <v-list-item-title v-text="currentArea.name"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-checkbox
                                    :input-value="active"
                                    :true-value="getAreaCheckBoxTrueValue(currentUrbanAreaWithAreas,currentArea)"
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
import { UrbanArea } from '../dto/repository/entities/UrbanArea';
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
  
        return availableAreasPerUrbanAreas;
    }

    
    private getAreaCheckBoxTrueValue(currentUrbanAreaWithAreas: UrbanAreaAreas, currentArea: Area): string {
        
        const currentUrbanArea = new UrbanArea(currentUrbanAreaWithAreas.urbanAreaId, currentUrbanAreaWithAreas.urbanAreaName);
        
        const singleAreaCurrentArray = new Array(currentArea);
        const urbanAreaArea = new UrbanAreaAreas(currentUrbanArea, singleAreaCurrentArray);
        const urbanAreaAreaJSON = JSON.stringify(urbanAreaArea);
        return urbanAreaAreaJSON;
    }




    private get userSelectedAreasNames(): string[] {
        const userSelectedAreas = this.$store.getters.getUserSelectedAreas as UrbanAreaAreas[];
        const userSelectedAreasNames =
            userSelectedAreas
           .map( (a) => { return a as UrbanAreaAreas; })
           .map( (a) => { return a.urbanAreaName; });
        return userSelectedAreasNames;
    }

    private set userSelectedAreasNames(areaCheckBoxTrueValue: string[]) {
        const userSelectedAreas =
            this.availableAreasPerUrbanAreas
            .filter( (a) => {
                const isIncluded = areaCheckBoxTrueValue.includes(a.urbanAreaName);
                return isIncluded;
            });
            
            debugger;
        this.$store.dispatch('setUserSelectedAreas', userSelectedAreas);
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
