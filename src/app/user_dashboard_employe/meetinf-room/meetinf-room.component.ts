import { Component, HostBinding, INJECTOR, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'; //
import { Meeting } from 'src/app/_models/Meeting';
@Component({
  selector: 'app-meetinf-room',
  templateUrl: './meetinf-room.component.html',
  styleUrls: ['./meetinf-room.component.css']
})
export class MeetinfRoomComponent implements OnInit {
  @HostBinding('class') classes = 'mat-dialog-full-screen'; // Appliquer la classe de style
  meetingURL: string;
  meeting:Meeting;
  idMeetingAsString:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Meeting
  ){
   this.meeting=data; 
    this.idMeetingAsString = this.meeting.toString();

   console.log("houni",data);
  // console.log(data.meeting.idMeeting); // Should print 38
   console.log("idmeet", this.idMeetingAsString);
  }
  

  ngOnInit() {
    this.initializeZego();
  }
  closeDialog() {
    this.classes = 'mat-dialog-full-screen slideOut'; // Appliquer l'animation de transition verticale lors de la fermeture
    setTimeout(() => {
      // Fermer la popup après l'animation de transition
      // Vous pouvez utiliser la méthode de fermeture de la popup appropriée ici
    }, 500); // Ajustez la durée de l'animation en fonction de la durée définie dans votre CSS
  }

  initializeZego() {
    function getUrlParams(url) {
      let urlStr = url.split('?')[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      const result: { [key: string]: string } = {};
      urlSearchParams.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    }
  
   // const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
   const roomID =this.idMeetingAsString;
   this.meetingURL = window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID;
  
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = "userName" + userID;
    const appID = 1414491476;
    const serverSecret = "446f3f3021a29587c63ab265319e3a42";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);
  
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: document.querySelector("#root"),
      sharedLinks: [{
        name: 'Personal link',
        url: this.meetingURL,
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
    });
  }
}
