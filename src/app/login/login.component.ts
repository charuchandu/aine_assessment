import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthenticationService} from '../authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public rt:Router,private as:AuthenticationService) { }

  ngOnInit(): void {
  }


  login(ref:NgForm){
    let employerCredentialObject=ref.value
    this.as.getEmployerToken(employerCredentialObject).subscribe(
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
          localStorage.setItem("company",res["company"]);
          this.rt.navigateByUrl('/jobposting');
        }
      },
      err=>{
        console.log("error in login",err);
        alert("something went wrong in login process")
      }
    )
  }

}
