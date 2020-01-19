<template>
    <v-list dense>
        <v-list-item-group
            v-model="internalSelectedAreas"
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
            <template v-for="(item, i) in allAreas">

                <v-list-item
                    :key="item.id"
                    :value="item"
                    active-class="deep-purple--text text--accent-4"
                >
                    <template v-slot:default="{ active, toggle }">
                        <v-list-item-content>
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-checkbox
                                :input-value="active"
                                :true-value="item"
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

@Component
export default class AreasListDrawer extends Vue {
    
    @Prop({default: new Array<Area>()}) allAreas!: Array<Area>;
    @Prop({default: new Array<Area>()}) selectedAreas!: Array<Area>;

    get internalSelectedAreas() {
        return this.selectedAreas;
    }
    set internalSelectedAreas(value: Array<Area>) {
        this.$emit("update-selected-areas", value);
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
