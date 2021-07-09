import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {DatePipe} from '@angular/common';
import { JobService } from '../job.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-jobposting',
  templateUrl: './jobposting.component.html',
  styleUrls: ['./jobposting.component.css']
})
export class JobpostingComponent implements OnInit {

  username:any;
  photo:any;
  email:any;
  company:any;
  date:any;
  constructor(private dp:DatePipe,public js:JobService,public rt:Router) { }


  ngOnInit(): void {

    //read user name local storage 
   this.username=localStorage.getItem("username");
   this.photo=localStorage.getItem("photo");
   this.email=localStorage.getItem("email");
   this.company=localStorage.getItem("company");
  }

  jobPost(ref:NgForm){
    let jobObject=ref.value;
    jobObject.company=this.company;
    this.date=this.dp.transform(new Date(),'shortDate');
    jobObject.date=this.date;
    this.js.jobPost(jobObject).subscribe(
      (res)=>{
        
        alert(res["message"]);
        //this.rt.navigateByUrl('/login');
      },
      (err)=>{
        console.log("err in posting job",err);
        alert("something went wrong!!")
      }
    )
  }

  click(event:any){
    localStorage.clear();
    this.rt.navigateByUrl("/employers");
  }

}
