import { Role } from "./Role";
import { User } from "./user";

export class GroupChat {
    id?: number;
    groupTitle!: string;
    rules!: string;
    role!: Role;
    users?: User[] = [];
}