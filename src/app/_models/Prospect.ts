import { ProspectStatus } from "./ProspectStatus";

export class Prospect {
    idProspect !: number ; 
    
    name!: string ;  
    email !: string ; 
    Numtel !: string ;  
    status !: ProspectStatus ; 
}