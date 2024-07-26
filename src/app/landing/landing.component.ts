import { Component, OnInit } from '@angular/core';
import{MsgService}from'./msg.service'
import { Message } from '../admin/notifications/message';
import { AccountService } from '../_services';
import { User } from '../_models';
import Swal from 'sweetalert2';
import { TokenService } from '../_services/Token.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
	//images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  Message: Message;
  isconn:boolean;
  user?: User | null;

  constructor(private MsgService :MsgService,private authService  :AccountService,private tokenService:TokenService,private router :Router) { 
    


  }

  ngOnInit() {
    this.isconn=this.authService.getIsConnected()|| this.tokenService.getgoogleToken() ||false;
    console.error('isconnnnn' +this.isconn)
    this.authService.user.subscribe(x => this.user = x);
    console.error('user' +this.user);
    this.Message={
    nom:"",
    email:"",
    message:"",
    tel:"",
    }
  }

  saveMessage(){
    this.MsgService.createMessage(this.Message).subscribe( data =>{
    console.log(data);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your Message has been Sent",
      showConfirmButton: false,
      timer: 1500
    });    this.Message={
      nom:"",
      email:"",
      message:"",
      tel:"",
      }
   // window.location.reload();
    },
    error => console.log(error));

    }
    openJobOpportModal() {
      this.router.navigate(['/test']);
}
}