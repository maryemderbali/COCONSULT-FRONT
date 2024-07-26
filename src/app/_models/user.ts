import { GroupChat } from "./GroupChat";
import { Role } from "./Role";

export class User {
    id?: number;
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    blocked?: boolean;
    Role?: string;
    token?: string;
    refreshToken?: string;
    groupChats?:GroupChat[]=[];
    address?: string;
    valid?: boolean;
    bannedchatGP?: boolean;
    number?: number;
    image?: string;
    roles?:Role[]=[];
    
}