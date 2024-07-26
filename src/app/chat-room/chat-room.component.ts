import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../_services/WebSocket.service';
import { ChatService } from '../_services/ChatRoom.service';
import { User } from '../_models';
import { GroupChatservice } from '../_services/GroupChat.service';
import { GroupChat } from '../_models/GroupChat';
import { HttpClient } from '@angular/common/http';
import { Socket, SocketIoConfig } from 'ngx-socket-io'; // Optional for direct sending (if needed)
import { Chat, MessageType } from '../_models/Chat';
import { AccountService } from '../_services';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  chats: Chat[] = [];
  messageContent: string = '';
  messageDisplay:  string;
  messages: { content: string, senderUsername: string }[] = [];

  oldChats: Chat [] = [];
  newChats: Chat [] = [];
  displayedMessages: Chat[] = [];
  sendermessages:string;
  currentChat: Chat;
  socket: Socket; 
  messageInput: string = '';
  GroupChatname: string;
  GroupChat: GroupChat;
  groupChatid: number;
  currentuser: User;
  myuser: User;
  msg: Chat;
  constructor(private chatService: WebSocketService, private GroupChatservice: GroupChatservice,private accountService: AccountService) { 
    this.currentuser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}') as User;
    
    this.accountService.getuserById(this.currentuser.id).subscribe((data: User) => {
      this.myuser = data;
      console.log('myuser:', this.myuser);
    });

    
  }

 
  findgroupchat() {
    this.GroupChatservice.getGroupChatByUser(this.currentuser.id).subscribe((data: GroupChat) => {
      this.GroupChat = data;
      this.GroupChatname = data.groupTitle;
      this.groupChatid = data.id;
     // console.log('groupchatid:', this.groupChatid);

      this.GroupChatservice.getchatpergroupchat(this.groupChatid).subscribe(
        (response) => { 
          //console.log(response);
          this.oldChats=response;
          //  this.messages = response;
           // this.currentuser=response[0].sender;
          },
          (error) => {
            console.error('Error loading messages:', error);
          }
        );
     // console.log(data);
    }, error => {
      console.error('An error occurred while loading available users:', error);
    });
  }
  
  sendMessage() {
    if (this.messageContent.trim()) {
      // Create a Chat object with message content and sender information (if needed)
      const chatMessage = new Chat();
      chatMessage.message = this.messageContent;
      chatMessage.sender = this.myuser;
      chatMessage.groupChat = this.GroupChat;
      chatMessage.type = MessageType.SENT;
      chatMessage.date = new Date();
      const destination = '/app/chat.sendMessage'; // Match the MessageMapping in Spring Boot

      this.chatService.sendMessage(destination,chatMessage);
        this.messageContent = '';
  }}
  // Function to extract the message content from the raw WebSocket message
extractMessageContent(message: any): string {
  if (message.body) {
    return message.body.trim(); 
  } else {
    return 'test'; 
  }}
  extractusername(message: any): string {
    if (message) {
      return message.username.trim(); 
    } else {
      return 'test'; 
    }}

  ngOnInit() {  
    
    this.findgroupchat();

    this.chatService.connect();
   // this.chatService.subscribeToGroupChatMessages(this.groupChatid);

    this.chatService.messages$.subscribe((result) => {
      const body=JSON.parse(result.body);
      console.info('Received message:', body);
      const content = body.content.trim();
      const senderUsername = body.sender.trim();
      this.messages.push({ content, senderUsername });
      console.info('messageDisplay:', this.messageDisplay);

    }, (error) => {
      console.error('Error processing message:', error);
    }
  );
  }
  ngOnDestroy() {
    // Disconnect from STOMP server on component destruction
    if (this.chatService.stompClient) {
      this.chatService.stompClient.disconnect();
    }
  }

}