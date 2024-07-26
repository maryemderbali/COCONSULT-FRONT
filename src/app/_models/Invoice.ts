import { Contract } from "./Contract";

export class Invoice {
    id !: number;
    invoiceNumber!: string;
    invoiceDate!: Date;
    dueDate!: Date;
    totalAmount!: number;
    status!: string;
    contract!: Contract;
  }