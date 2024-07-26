"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UpdateDialogComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var Role_1 = require("src/app/_models/Role");
var sweetalert2_1 = require("sweetalert2");
var UpdateDialogComponent = /** @class */ (function () {
    function UpdateDialogComponent(dialogRef, formBuilder, groupChatService, data) {
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.groupChatService = groupChatService;
        this.data = data;
        this.updateGroupChat = new core_1.EventEmitter();
        this.roleOptions = Object.values(Role_1.RoleName);
        this.usersOptions = [];
        this.usersByRole = [];
        this.updateForm = this.formBuilder.group({
            groupTitle: [''],
            rules: [''],
            role: ['']
        });
        this.addusersform = this.formBuilder.group({
            selectedUsers: new forms_1.FormControl([])
        });
    }
    UpdateDialogComponent.prototype.loadAvailableUsers = function () {
        var _this = this;
        this.groupChatService.getAvailableUsers().subscribe(function (data) {
            var _a;
            _this.usersOptions = data;
            (_a = _this.updateForm.get('role')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (selectedRole) {
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
    UpdateDialogComponent.prototype.ngOnInit = function () {
        this.loadAvailableUsers();
        if (this.data && this.data.groupChat) {
            var groupChatData = this.data.groupChat;
            this.updateForm.patchValue({
                groupTitle: groupChatData.groupTitle,
                rules: groupChatData.rules,
                role: groupChatData.role.name
            });
        }
    };
    UpdateDialogComponent.prototype.sendaddusersform = function () {
        var _this = this;
        var selectedUserIds = this.addusersform.value.selectedUsers;
        console.log(selectedUserIds);
        // Map selected user IDs to user objects
        var selectedUsers = selectedUserIds.map(function (id) { return _this.usersOptions.find(function (user) { return user.id === id; }); });
        console.log(selectedUsers);
        this.groupChatService.addUserToGroupChatByRole(this.data.groupChat.id, selectedUserIds).subscribe(function () {
            console.log('Users added successfully');
            sweetalert2_1["default"].fire('Utilisateurs ajoutés avec succès');
        }, function (error) {
            console.error('An error occurred while adding users:', error);
            sweetalert2_1["default"].fire('Utilisateurs n a aps le droit pour  rejoidre ce GP !');
            // Handle error
        });
    };
    UpdateDialogComponent.prototype.onSubmit = function () {
        // Get the updated values from the form
        var updatedGroupChat = {
            id: this.data.groupChat.id,
            groupTitle: this.updateForm.value.groupTitle,
            rules: this.updateForm.value.rules,
            role: { name: this.updateForm.value.role }
        };
        this.groupChatService.updateGroupChat(updatedGroupChat.id, updatedGroupChat.groupTitle, updatedGroupChat.rules).subscribe(function () {
            console.log('Group chat updated successfully');
            sweetalert2_1["default"].fire('Groupe de discussion mis à jour avec succès');
        }, function (error) {
            console.error('An error occurred while updating group chat:', error);
            sweetalert2_1["default"].fire('Vous n avez pas le droit de modifier le role de ce GP !');
            // Handle error
        });
        // Emit the updated GroupChat to the parent component
        this.updateGroupChat.emit(updatedGroupChat);
        // Close the dialog
        this.dialogRef.close();
    };
    UpdateDialogComponent.prototype.onCancel = function () {
        // Close the dialog without updating
        this.dialogRef.close();
    };
    __decorate([
        core_1.Input()
    ], UpdateDialogComponent.prototype, "groupChat");
    __decorate([
        core_1.Output()
    ], UpdateDialogComponent.prototype, "updateGroupChat");
    UpdateDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-update-dialog',
            templateUrl: './update-dialog.component.html',
            styleUrls: ['./update-dialog.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], UpdateDialogComponent);
    return UpdateDialogComponent;
}());
exports.UpdateDialogComponent = UpdateDialogComponent;
