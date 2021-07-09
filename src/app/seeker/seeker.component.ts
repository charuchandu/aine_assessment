import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SeekerService } from '../seeker.service';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.css']
})
export class SeekerComponent implements OnInit {


  file:any;
 		     incomingfile(event:any)
          {
  			  this.file= event.target.files[0];
    		  }


          formData=new FormData();

  constructor(public ss:SeekerService,public rt:Router) { }

  ngOnInit(): void {
  }


  seekerRegistration(formref:NgForm){
    let seekerObject=formref.value;
    console.log(seekerObject);

    this.formData.append('photo',this.file,this.file.name);
 
     this.formData.append("seekerObject",JSON.stringify(seekerObject))

    this.ss.sregister(this.formData).subscribe(
      (res)=>{
        
        alert(res["message"]);
        this.rt.navigateByUrl('/seekerlogin');
      },
      (err)=>{
        console.log("err in seeker registration",err);
        alert("something went wrong!!")
      }
    )

  }

  click(event:any){
    this.rt.navigateByUrl('/seekerlogin')
  }
}
