import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import 'rxjs/Rx';
import { LoginAttempt } from '../../../models/login-attempt';

@Injectable()
export class UserService {

	constructor(
		private http:Http
	) { }

	login(attempt:LoginAttempt):Observable<boolean>{
		console.debug("posting to server");
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options=new RequestOptions({headers:headers});
		return this.http.post("/api/post/empty",attempt,options).map((res:Response)=>{return false});
	}

	
}
