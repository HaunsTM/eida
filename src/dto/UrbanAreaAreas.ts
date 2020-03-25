import { Area } from './repository/entities/Area';
import { UrbanArea } from './repository/entities/UrbanArea';

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
