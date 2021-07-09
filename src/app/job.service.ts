import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(public hc:HttpClient) { }

   //employer registration
   jobPost(JobObject:any):Observable<any>{
    //http post request
   return this.hc.post("job/jobPost",JobObject)
  }

  getAllNotifications(notifications:any):Observable<any>{
    return this.hc.get<any[]>('/job/notifications',notifications)
   }
}
