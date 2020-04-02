import { Area } from './Area';
import { UrbanArea } from './UrbanArea';

export class UserSelectedArea {

    public urbanArea: UrbanArea;

    public area: Area;

    constructor(serializedUserSelectedArea: string)
    constructor(urbanArea: UrbanArea, area: Area) 
    constructor(serializedUserSelectedAreaOrUrbanArea: string|UrbanArea, area?: Area ){

        if (serializedUserSelectedAreaOrUrbanArea instanceof UrbanArea && area) {
            
            this.urbanArea = serializedUserSelectedAreaOrUrbanArea;
            this.area = area;
        } else {
            const temp = <UserSelectedArea>JSON.parse(serializedUserSelectedAreaOrUrbanArea as string);
            
            this.urbanArea = temp.urbanArea;
            this.area = temp.area;
        }
    }

    public toJSON(): string {
        const thisObject = {
            urbanArea : this.urbanArea,
            area : this.area
        };
        const jSON = JSON.stringify(thisObject);
        return jSON;
    }

}
