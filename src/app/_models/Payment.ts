import { Contract } from "./Contract";

export class Payment {
    id!: number;
    paymentDate!: Date;
    amount!: number;
    paymentMethod!: string;
    referenceNumber!: string;
    contract!: Contract;
  }