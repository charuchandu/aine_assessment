import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(public hc:HttpClient) { }

  //employer registration
  eregister(employerObject:any):Observable<any>{
    //http post request
   return this.hc.post("employer/eregister",employerObject)
  }
}
