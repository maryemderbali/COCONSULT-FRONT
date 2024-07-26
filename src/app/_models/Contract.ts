import { Etape } from "./EtapeContract";
import { Repertoire } from "./Repertoire";

export class Contract {
    idContract!: number;
    referenceContract! : string ; 
    description!: string;
    dateContract!: Date; 
    montant!: number;
    nbreTranche!: number;
    etape!: Etape;
    repertoire!: Repertoire; // Change to Repertoire object instead of String
     
}