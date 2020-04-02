import { Area } from '../dto/repository/entities/Area';
import { UrbanArea } from '../dto/repository/entities/UrbanArea';
import { UserSelectedArea } from '../dto/repository/entities/UserSelectedArea';
import { UrbanAreaAreas } from '../dto/UrbanAreaAreas';

export class Convert {

    public static UrbanAreaAreas2UserSelectedAreas(urbanAreasAreas: UrbanAreaAreas[]) : UserSelectedArea[] {
        const userSelectedAreas =
        urbanAreasAreas.flatMap( (uAA) => { 
            const userSelectedAreas = uAA.areas.map( (uSA) => {
                const urbanArea = new UrbanArea(uAA.urbanAreaId, uAA.urbanAreaName);
                const area = new Area(uSA.id, uSA.name);
                return new UserSelectedArea(urbanArea, area);
            })
            return userSelectedAreas;
        })
        return userSelectedAreas;
    }

    public static UserSelectedAreas2UrbanAreaAreas(userSelectedAreas: UserSelectedArea[]) : Array<UrbanAreaAreas> {
        
        let tempUrbanAreaAreasArray: Array<UrbanAreaAreas> = Array();

        for (const currentUserSelectedArea of userSelectedAreas) {

            const tempAreaArray: Array<Area> = Array();

            const currentUrbanAreaAreasIsAlreadyInArray =
                tempUrbanAreaAreasArray.some( (tUAA) => { return tUAA.urbanAreaId === currentUserSelectedArea.urbanArea.id } );

            if (currentUrbanAreaAreasIsAlreadyInArray) {
                debugger;
                tempUrbanAreaAreasArray = tempUrbanAreaAreasArray.map( (uAA) => {
                    if (uAA.urbanAreaId === currentUserSelectedArea.urbanArea.id) {
                        uAA.areas.push(currentUserSelectedArea.area);
                        uAA.areas = Array.from(new Set(uAA.areas));                        
                    }
                    return uAA;
                });

            } else {
                tempAreaArray.push(currentUserSelectedArea.area);
                const tempUrbanAreaAreas = new UrbanAreaAreas(currentUserSelectedArea.urbanArea, tempAreaArray)

                tempUrbanAreaAreasArray.push(tempUrbanAreaAreas);
            }
            
        }

        return tempUrbanAreaAreasArray;
    }
}
