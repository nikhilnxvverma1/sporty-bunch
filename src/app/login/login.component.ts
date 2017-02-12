import { Component, OnInit } from '@angular/core';
import { LoginAttempt } from '../../models/login-attempt';
import { Router,NavigationExtras } from '@angular/router';
import { UserService } from '../helpers/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	attempt:LoginAttempt=new LoginAttempt();

	constructor(
		private router:Router,
		private userService:UserService
	) { }

	ngOnInit() {
	}

	doLogin(){
		// call the service
		console.debug("Attempting form submit");
		this.userService.login(this.attempt).subscribe((pass:boolean)=>{
			console.debug("moving to dashboard");
			this.router.navigate(["/home/dashboard"]);
		},(error:Error)=>{
			console.debug("error "+error);
		});
		return false;
	}

}
