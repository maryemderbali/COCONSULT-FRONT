"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WebSocketService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var stompjs_1 = require("@stomp/stompjs");
var WebSocketService = /** @class */ (function () {
    function WebSocketService(http, GroupChatservice, accountservice) {
        this.http = http;
        this.GroupChatservice = GroupChatservice;
        this.accountservice = accountservice;
        this.messagesSubject = new rxjs_1.Subject();
        this.messages$ = this.messagesSubject.asObservable();
        this.currentuser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
        this.GroupChat = this.accountservice.getCurrentGroupChatValue() || JSON.parse(localStorage.getItem('currentGroupChat'));
        this.groupChatid = this.GroupChat.id;
        console.info('groupchatid:', this.groupChatid);
    }
    WebSocketService.prototype.connect = function () {
        var _this = this;
        this.stompClient = new stompjs_1.Client({
            webSocketFactory: function () { return new WebSocket('ws://localhost:8080/ws'); }
        });
        this.stompClient.onConnect = function () {
            console.log('Connected to WebSocket server');
            // Subscribe to your desired destination
            _this.stompClient.subscribe('/topic/groupChat/' + _this.groupChatid, function (message) {
                _this.messagesSubject.next(message);
            });
        };
        this.stompClient.onStompError = function (error) {
            console.error('STOMP protocol error:', error);
        };
        this.stompClient.activate();
    };
    // Method to subscribe to the specified group chat topic
    WebSocketService.prototype.subscribeToGroupChatMessages = function (groupChatId) {
        var _this = this;
        // Subscribe to the topic where group chat messages are being broadcasted
        this.stompClient.subscribe('/topic/groupChat/' + groupChatId, function (message) {
            var receivedMessage = message.body;
            // Handle the received message here, such as emitting it through an observable
            _this.messagesSubject.next(receivedMessage);
        });
    };
    WebSocketService.prototype.subscribeToTopic = function (groupChatid) {
        var _this = this;
        this.stompClient.subscribe('/topic/groupChat/' + groupChatid, function (message) {
            var chatMessage = JSON.parse(message.body);
            _this.messagesSubject.next(chatMessage);
        });
    };
    WebSocketService.prototype.sendMessage = function (destination, message) {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.publish({ destination: destination, body: JSON.stringify(message) });
        }
        else {
            console.error('WebSocket connection not established.');
        }
    };
    WebSocketService.prototype.disconnect = function () {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.deactivate();
        }
    };
    WebSocketService.prototype.getMessages = function () {
        return this.messagesSubject.asObservable();
    };
    WebSocketService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], WebSocketService);
    return WebSocketService;
}());
exports.WebSocketService = WebSocketService;
