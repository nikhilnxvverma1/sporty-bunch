import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class EventService {

	constructor(
		private http:Http
	) { }

	emptyPost():Observable<boolean>{
		console.debug("sending empty post request");
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options=new RequestOptions({headers:headers});
		let empty={
			value:false
		}
		return this.http.post("/api/post/empty",empty,options).map((res:Response)=>{return false});
	}

	emptyPut():Observable<boolean>{
		console.debug("sending empty put request");
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options=new RequestOptions({headers:headers});
		let empty={
			value:false
		}
		return this.http.put("/api/put/empty",empty,options).map((res:Response)=>{return false});
	}

	emptyGet():Observable<boolean>{
		console.debug("sending empty get request");
		return this.http.get("api/get/empty").map((response:Response)=>{return false});
	}

	emptyDelete():Observable<boolean>{
		console.debug("sending empty delete request");
		return this.http.delete("api/delete/empty").map((response:Response)=>{return false});
	}
}
