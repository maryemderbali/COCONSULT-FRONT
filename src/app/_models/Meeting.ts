export class Meeting {
    idMeeting!: number;
    dateMeeting!: Date;
    typeMeet!:TypeMeet;

  }

  export enum TypeMeet{
    Online = 'Online',
    InSitu = 'InSitu',
    Hybrid = 'Hybrid',
 
}