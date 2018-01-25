import { Component, OnInit } from '@angular/core';
import { Signup } from '../../models/signup';
import { UserService } from '../helpers/services/user.service';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	private signup:Signup=new Signup();
	private failedSignup=false;
	private failureMessage:string;

	constructor(
		private router:Router,
		private userService:UserService
	) { }

	ngOnInit() {
	}

	doSignup(){
		// call the service
		console.debug("Signup a new user");
		this.userService.signup(this.signup).subscribe((pass:boolean)=>{
			console.debug("moving back ot homepage");
			this.router.navigate(["/"]);
		},(error:any)=>{
			if(error.status==422){
				if(error._body==2){
					this.failureMessage="Email already exists";
				}else if(error._body==3){
					this.failureMessage="Weak password";
				}else if(error._body==4){
					this.failureMessage="Null password";
				}
			}
			console.debug("error "+error);
		});
	}

}
