import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {EmployerService} from '../employer.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css']
})
export class EmployersComponent implements OnInit {

  file:any;
 		     incomingfile(event:any)
          {
  			  this.file= event.target.files[0];
    		  }


          formData=new FormData();

  constructor(public es:EmployerService,private rt:Router) { }

  ngOnInit(): void {
  }
  employerRegistration(formref:NgForm){
    let employerObject=formref.value;
    console.log(employerObject);

    this.formData.append('photo',this.file,this.file.name);
 
     this.formData.append("employerObject",JSON.stringify(employerObject))

    this.es.eregister(this.formData).subscribe(
      (res)=>{
        
        alert(res["message"]);
        this.rt.navigateByUrl('/login');
      },
      (err)=>{
        console.log("err in employer registration",err);
        alert("something went wrong!!")
      }
    )

  }

  click(event:any){
    this.rt.navigateByUrl('/login')
  }
}
