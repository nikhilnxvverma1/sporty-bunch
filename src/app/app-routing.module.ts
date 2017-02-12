import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './post-authentication/home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '',  component: LandingPageComponent},
      { path: 'signup',  component: SignupComponent },
      { path: 'home',  component: HomeComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}