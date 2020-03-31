import { Area } from './Area';
import { UrbanArea } from './UrbanArea';

export class UrbanAreaAreas {

    public urbanAreaId: number;
    public urbanAreaName: string;

    public areas: Area[];

    constructor(
        urbanArea: UrbanArea,
        areas: Area[]) {

            this.urbanAreaId = urbanArea.id;
            this.urbanAreaName = urbanArea.name;
            this.areas = areas;
    }

}
