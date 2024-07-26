import { GroupChat } from "./GroupChat";
import { User } from "./user";

export enum MessageType {
    SENT = 'SENT',
    RECEIVED = 'RECEIVED',
    CHAT= 'CHAT',
    JOIN= 'JOIN',
    LEAVE= 'LEAVE'
}



export class Chat {
    id: number;
    date: Date = new Date();
    message: string;
    type: MessageType;
    sender: User;
    groupChat: GroupChat;

    constructor(
        id?: number,
        date?: Date,
        message?: string,
        type?: MessageType,
        sender?: User,
        groupChat?: GroupChat
    ) {
        this.id = id;
        this.date = date;
        this.message = message;
        this.type = type;
        this.sender = sender;
        this.groupChat = groupChat;
    }
}