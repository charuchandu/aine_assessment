import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { EmployersComponent } from './employers/employers.component';
import { LoginComponent } from './login/login.component';
import { JobpostingComponent } from './jobposting/jobposting.component';
import { CommonModule, DatePipe } from '@angular/common';
import { JobsComponent } from './jobs/jobs.component';
import { SeekerComponent } from './seeker/seeker.component';
import { SeekerloginComponent } from './seekerlogin/seekerlogin.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    EmployersComponent,
    LoginComponent,
    JobpostingComponent,
    JobsComponent,
    SeekerComponent,
    SeekerloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
