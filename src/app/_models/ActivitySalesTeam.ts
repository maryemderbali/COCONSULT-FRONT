import { Repertoire } from "./Repertoire";

export class SalesActivity {
    idActSale!: number;
    heureStart!: Date;
    heureEnd!: Date;
    description!: string;
    typeAct!: TypeSalesActivity;
    status!: Status;
    classSalesTeam!:ClassActivity ; 
    repertoire!: Repertoire; // Change to Repertoire object instead of String
  
}

export enum Status {
    DONE,
    WAITING
}
  

export enum TypeSalesActivity {
    REUNION ,
    APPEL_TELEPHONIQUE ,
    RESUME_APPEL ,
    MEETING ,
    CALL_SUMMARY 
  }

  export enum ClassActivity {
    Prospecting  ,
    Negotiation ,
    Closing ,

  }