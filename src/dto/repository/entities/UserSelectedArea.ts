import { Area } from './Area';
import { UrbanArea } from './UrbanArea';

export class UserSelectedArea {

    public urbanArea: UrbanArea;

    public area: Area;

    constructor(urbanArea: UrbanArea, area: Area) {
            
        this.urbanArea = urbanArea;
        this.area = area;
    }

}
