import { Message } from '../admin/notifications/message';
import { User } from './user';

export class Notification {
    id?: number;
    date?: Date;
    title?: string;
    message!: string;
    adminMsgId?: Message;
    recipients?: User[];
}