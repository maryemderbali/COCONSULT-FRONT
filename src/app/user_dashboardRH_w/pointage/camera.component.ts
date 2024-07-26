import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PointageService } from './pointage.service';
import { UserService } from '../users/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  isCameraOn = false;
  //public ispointed:any;
  stream: MediaStream;
  selectedUser: number;
  users: any[] = []; // Initialize as empty array
  userId:number;
  constructor(
    private router: Router,
    private pointageService: PointageService,
    private userService: UserService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    // Fetch users when the component initializes
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      error => {
        console.log('Error fetching users:', error);
      }
    );
  }

  toggleCamera() {
    if (!this.isCameraOn) {
      this.startCamera();
    } else {
      this.stopCamera();
    }
  }

  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoPlayer.nativeElement.srcObject = this.stream;
      this.isCameraOn = true;
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert(`Error accessing camera: ${error.name} - ${error.message}`);

    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.isCameraOn = false;
    }
  }

  async recordPointage() {
    // Call the appropriate method from the PointageService to record the pointage
    
    const capturedImage = this.captureImage();
    if (!capturedImage) {
    console.error('Failed to capture image.');
    return;
  }

  
    
    const image = {'image': capturedImage};
    const response = await this.sendDataToServer(image)
    if (response == -1)
    {
      alert(response )

    }
    else
    {                                  
      alert(response )
     
    this.pointageService.addUserPointage(response).subscribe(
      (response) => { 
        //console.log(this.ispointed);
       // console.log("hhhhhhhhhhhhh")
        console.log('Pointage recorded successfully:', response);
        alert('Pointage recorded successfully');
        // Optionally, perform any additional actions after recording the pointage
      },
      (error) => {
        console.error('Error recording pointage:', error);
        alert('Pointage recorded successfully');
        // Optionally, perform any additional actions
       
      }
    );
  }}
  captureImage() {
    const canvas = document.createElement('canvas');
    canvas.width = this.videoPlayer.nativeElement.videoWidth;
    canvas.height = this.videoPlayer.nativeElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(this.videoPlayer.nativeElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
  }
  async sendDataToServer(data: any): Promise<any> {
    const url = 'http://127.0.0.1:5000/'; // Remplacez par l'URL de votre API
    return new Promise((resolve, reject) => {
      this.http.post(url, data).subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
          resolve(response);
        },
        (error) => {
          console.error('Error sending data:', error);
          reject(error);
          alert('Error recording pointage');
        }
      );
    });
  }

 

  
}

