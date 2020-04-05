<template>
    <v-list dense>
        <v-list-item-group
            v-model="userSelectedAreas"
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
            <template v-for="(currentUrbanAreaWithAreas, currentUrbanAreaWithAreasIndex) in availableAreasPerUrbanAreas">
                <v-subheader :key="'urbanAreaId-' + currentUrbanAreaWithAreas.urbanAreaId">{{currentUrbanAreaWithAreas.urbanAreaName}}</v-subheader>
                <template v-for="(currentArea, index) in currentUrbanAreaWithAreas.areas">
                    <v-list-item
                        :key="currentArea.id"
                        :value="getUserSelectedAreaJSON(currentUrbanAreaWithAreas,currentArea)"
                        active-class="deep-purple--text text--accent-4"
                    >
                        <template v-slot:default="{ active, toggle }">
                            <v-list-item-content>
                                <v-list-item-title v-text="currentArea.name"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-checkbox
                                    :input-value="active"
                                    :true-value="getUserSelectedAreaJSON(currentUrbanAreaWithAreas,currentArea)"
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
import { Convert } from '../helpers/Convert';
import { UrbanArea } from '../dto/repository/entities/UrbanArea';
import { UserSelectedArea } from '../dto/repository/entities/UserSelectedArea';
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

    
    private getUserSelectedAreaJSON(currentUrbanAreaWithAreas: UrbanAreaAreas, currentArea: Area): string {
        const currentUrbanArea = new UrbanArea(currentUrbanAreaWithAreas.urbanAreaId, currentUrbanAreaWithAreas.urbanAreaName);
        const currentUserSelectedArea = new UserSelectedArea(currentUrbanArea, currentArea);
        const currentUserSelectedAreaJSON = JSON.stringify(currentUserSelectedArea);

        return currentUserSelectedAreaJSON;
    }

    private get userSelectedAreas(): string[] {
        const userSelectedAreas = this.$store.getters.getUserSelectedAreas as UserSelectedArea[];        
        const userSelectedAreasJSON = userSelectedAreas.map( (uSA) => {
            const userSelectedAreaJSON = JSON.stringify(uSA);
            return userSelectedAreaJSON;
        }); 
        
        return userSelectedAreasJSON;
    }

    private set userSelectedAreas(userSelectedAreasJSONs: string[]) {

        const userSelectedAreas = userSelectedAreasJSONs.map( (j) => {
            const currentUseraSelectedArea = JSON.parse(j) as UserSelectedArea;
            return currentUseraSelectedArea;
        });
        this.$store.dispatch('setUserSelectedAreas', userSelectedAreas);
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
