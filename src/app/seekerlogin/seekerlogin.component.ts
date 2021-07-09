import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthenticationService} from '../authentication.service'


@Component({
  selector: 'app-seekerlogin',
  templateUrl: './seekerlogin.component.html',
  styleUrls: ['./seekerlogin.component.css']
})
export class SeekerloginComponent implements OnInit {

  constructor(public rt:Router,private as:AuthenticationService) { }

  ngOnInit(): void {
  }
  login(ref:NgForm){
    let seekerCredentialObject=ref.value
    this.as.getSeekerToken(seekerCredentialObject).subscribe(
      res=>{
        if(res["status"]=="failed"){
          alert(res["message"]);
        }
        else if(res["status"]=="success"){
          //store token in local storage
          localStorage.setItem("token",res["message"]);
          localStorage.setItem("username",res["username"]);
          localStorage.setItem("photo",res["photo"]);
          localStorage.setItem("email",res["email"]);
          localStorage.setItem("isLogedIn","true")
          this.rt.navigateByUrl('/jobs');
        }
      },
      err=>{
        console.log("error in login",err);
        alert("something went wrong in login process")
      }
    )
  }

}

