import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {

  constructor(public hc:HttpClient) { }
  //seeker registration
  sregister(seekerObject:any):Observable<any>{
    //http post request
   return this.hc.post("seeker/sregister",seekerObject)
  }
}
