"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupChatComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Role_1 = require("src/app/_models/Role");
var sweetalert2_1 = require("sweetalert2");
var update_dialog_component_1 = require("./update-dialog/update-dialog.component");
var GroupChatComponent = /** @class */ (function () {
    function GroupChatComponent(groupChatService, dialog) {
        this.groupChatService = groupChatService;
        this.dialog = dialog;
        this.GPCHAT = [];
        this.HRGPCHAT = [];
        this.PMGPCHAT = [];
        this.CRMGPCHAT = [];
        this.EmployeeGPCHAT = [];
        this.ManagerGPCHAT = [];
        this.ConsultGPCHAT = [];
        this.roleOptions = Object.values(Role_1.RoleName);
        this.usersOptions = [];
        // selectedUsers: any[] = [];
        this.usersByRole = [];
        this.groupChatForm = new forms_1.FormGroup({
            groupTitle: new forms_1.FormControl(''),
            rules: new forms_1.FormControl(''),
            role: new forms_1.FormControl(Role_1.RoleName.HR),
            selectedUsers: new forms_1.FormControl([])
        });
    }
    GroupChatComponent.prototype.loadAvailableUsers = function () {
        var _this = this;
        this.groupChatService.getAvailableUsers().subscribe(function (data) {
            var _a;
            _this.usersOptions = data;
            (_a = _this.groupChatForm.get('role')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (selectedRole) {
                _this.usersByRole = [];
                _this.usersOptions.forEach(function (user) {
                    user.roles.forEach(function (role) {
                        if (role.name === selectedRole) {
                            _this.usersByRole.push(user);
                        }
                    });
                });
            });
            //  console.log(data);
        }, function (error) {
            console.error('An error occurred while loading available users:', error);
        });
    };
    GroupChatComponent.prototype.ngOnInit = function () {
        this.refreshData();
    };
    GroupChatComponent.prototype.loadGPCHAT = function () {
        var _this = this;
        this.groupChatService.getAllGroupChats().subscribe(function (data) {
            _this.GPCHAT = data;
            _this.HRGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.role.name === 'HR'; });
            //  console.log(this.HRGPCHAT);
            _this.PMGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.role.name === 'PM'; });
            // console.log(this.PMGPCHAT);
            _this.CRMGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.role.name === 'CRM'; });
            _this.ManagerGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.role.name === 'Manager'; });
            _this.ConsultGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.role.name === 'Consult'; });
            _this.EmployeeGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.role.name === 'Employee'; });
            _this.CRMGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.role.name === 'CRM'; });
        });
    };
    GroupChatComponent.prototype.refreshData = function () {
        this.loadGPCHAT();
        this.loadAvailableUsers();
    };
    /*addUserToFormArray(user: User): void {
      (this.groupChatForm.get('users') as FormArray).push(new FormControl(user.id));
    }*/
    GroupChatComponent.prototype.saveGroupChat = function () {
        var _this = this;
        var _a, _b, _c;
        if (this.groupChatForm.valid) {
            var selectedUserIds = this.groupChatForm.value.selectedUsers;
            console.log(selectedUserIds);
            // Map selected user IDs to user objects
            var selectedUsers = selectedUserIds.map(function (id) { return _this.usersOptions.find(function (user) { return user.id === id; }); });
            // console.log(selectedUsers);
            var newGroupChat = {
                groupTitle: (_a = this.groupChatForm.get('groupTitle')) === null || _a === void 0 ? void 0 : _a.value,
                rules: (_b = this.groupChatForm.get('rules')) === null || _b === void 0 ? void 0 : _b.value,
                role: {
                    name: (_c = this.groupChatForm.get('role')) === null || _c === void 0 ? void 0 : _c.value
                },
                users: selectedUsers
            };
            console.log(newGroupChat);
            this.groupChatService.createGroupChat(newGroupChat).subscribe({
                next: function () {
                    console.log('Group chat saved successfully');
                    _this.refreshData();
                    _this.groupChatForm.reset();
                },
                error: function (error) {
                    console.error('An error occurred while saving group chat:', error);
                }
            });
        }
    };
    GroupChatComponent.prototype["delete"] = function (idGPCHAT) {
        var _this = this;
        this.groupChatService.deleteGroupChat(idGPCHAT).subscribe(function (data) {
            console.log(data);
            sweetalert2_1["default"].fire({
                position: "top-end",
                icon: "success",
                title: "Groupchat has been deleted successfully",
                showConfirmButton: false,
                timer: 1500
            });
            _this.refreshData();
        }, function (error) {
            console.log(error);
        });
    };
    GroupChatComponent.prototype.openUpdateDialog = function (groupChat) {
        var _this = this;
        var dialogRef = this.dialog.open(update_dialog_component_1.UpdateDialogComponent, {
            width: '400px',
            data: { groupChat: groupChat } // Pass the GroupChat data to the dialog
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.refreshData();
            //    console.log("resultat"+result)
        });
    };
    GroupChatComponent = __decorate([
        core_1.Component({
            selector: 'app-group-chat',
            templateUrl: './group-chat.component.html',
            styleUrls: ['./group-chat.component.css']
        })
    ], GroupChatComponent);
    return GroupChatComponent;
}());
exports.GroupChatComponent = GroupChatComponent;
