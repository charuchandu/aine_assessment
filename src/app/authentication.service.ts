import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private hc:HttpClient,public rt:Router) { }

  getEmployerToken(employerCredentialObject:any):Observable<any>{
    console.log(employerCredentialObject);
    return this.hc.post("/employer/login",employerCredentialObject);
  }

  getSeekerToken(seekerCredentialObject:any):Observable<any>{
    console.log(seekerCredentialObject);
    return this.hc.post("/seeker/login",seekerCredentialObject);
  }


}
