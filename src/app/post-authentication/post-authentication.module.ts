import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


@NgModule({
  imports: [
    CommonModule,
	BrowserModule,
	FormsModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HeaderComponent, HomeComponent, DashboardComponent, MyProfileComponent]
})
export class PostAuthenticationModule { }
