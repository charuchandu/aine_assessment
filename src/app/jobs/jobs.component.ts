import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  notifications:any;
  button:any;
  isLogedIn:any=false;

  constructor(private js:JobService,public rt:Router) { }

  ngOnInit(): void {
    this.js.getAllNotifications(this.notifications).subscribe(
      res=>{
        this.notifications=res["notifications"];
        console.log(this.notifications);
      },
      err=>{
        alert("some wrong occured");
        console.log(err);
      }
    )

    
    this.isLogedIn=localStorage.getItem("isLogedIn")

  }

  click1(event:any){ 
    this.isLogedIn=false
    this.rt.navigateByUrl("/seeker");
  }

  click2(event:any){
    this.isLogedIn=true;
    location.reload();
    localStorage.clear();
  }

    
}