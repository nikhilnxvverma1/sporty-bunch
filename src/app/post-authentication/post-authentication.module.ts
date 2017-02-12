import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PostAuthenticationRoutingModule } from './post-authentication-routing.module';
import { TheirProfileComponent } from './their-profile/their-profile.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventComponent } from './event/event.component';
import { SearchComponent } from './search/search.component';
import { UserService } from '../helpers/services/user.service';

@NgModule({
  imports: [
    CommonModule,
	BrowserModule,
	FormsModule,
	PostAuthenticationRoutingModule
	],
	schemas:[CUSTOM_ELEMENTS_SCHEMA],
	declarations: [HeaderComponent, HomeComponent, DashboardComponent, MyProfileComponent, TheirProfileComponent, CreateEventComponent, EventComponent, SearchComponent],
	providers:[]
})
export class PostAuthenticationModule { }
