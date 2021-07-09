import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployersComponent} from './employers/employers.component';
import {LoginComponent} from './login/login.component';
import {JobpostingComponent} from './jobposting/jobposting.component'
import { JobsComponent } from './jobs/jobs.component';
import { SeekerComponent } from './seeker/seeker.component';
import { SeekerloginComponent } from './seekerlogin/seekerlogin.component';

const routes: Routes = [
  {path:"jobs",component:JobsComponent},
  {path:"employers",component:EmployersComponent},
  {path:"login",component:LoginComponent},
  {path:"jobposting",component:JobpostingComponent},
  {path:"seeker",component:SeekerComponent},
  {path:"seekerlogin",component:SeekerloginComponent},
  {path:"",redirectTo:"/jobs",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
