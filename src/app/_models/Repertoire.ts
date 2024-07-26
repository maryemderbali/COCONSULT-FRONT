import { priorite } from "./priorite";
import { TypeContact } from "./typeContact";

export class Repertoire {

    idRepertoire !: number ; 
    contact !: string ; 
    numTel !: string ; 
    email !: string ;
    TypeContact !: TypeContact  ;
    Priorite !: priorite ; 

}