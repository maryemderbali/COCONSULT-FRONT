"use strict";
exports.__esModule = true;
exports.Chat = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["SENT"] = "SENT";
    MessageType["RECEIVED"] = "RECEIVED";
    MessageType["CHAT"] = "CHAT";
    MessageType["JOIN"] = "JOIN";
    MessageType["LEAVE"] = "LEAVE";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var Chat = /** @class */ (function () {
    function Chat(id, date, message, type, sender, groupChat) {
        this.date = new Date();
        this.id = id;
        this.date = date;
        this.message = message;
        this.type = type;
        this.sender = sender;
        this.groupChat = groupChat;
    }
    return Chat;
}());
exports.Chat = Chat;
