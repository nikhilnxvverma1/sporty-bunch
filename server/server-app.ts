import express = require('express');
import http = require('http');
import https = require('https');
import path = require('path');
import ojs = require('orientjs');
import winston = require('winston');
import { UserBackend,statusCodeForLogin,statusCodeForSignup,AuthenticationResult } from './user.backend';
import { EventBackend } from './event.backend';
import { SchemaBackend } from './schema.backend';

export class ServerApp {
    
	private app: express.Application;
	private db:ojs.Db;
	private userBackend:UserBackend;
	private eventBackend:EventBackend;
    private schemaBackend:SchemaBackend;

	constructor(db?:ojs.Db) {
		this.app = express();
		this.db=db;
		this.userBackend=new UserBackend(this.db);
		this.eventBackend=new EventBackend(this.db);
		this.schemaBackend=new SchemaBackend(this.db);
	}
    
    public setRoutes() {        //the order matters here

		this.configureAPIRoutes();
		
		//static resources (is amongst the main folders in the root of the project)
		this.app.use('/', express.static(path.join(__dirname, '../', 'dist')));//for one level

		//all other routes are handled by angular
		this.app.get('/*', this._homePage);//this should be in the end
	}

	private configureAPIRoutes(){

		//create new user
		this.app.post('/api/user/create-user', (req:express.Request, res:express.Response) => {
			winston.debug("Attempting to create new user");
			this.userBackend.checkAndCreateNewUser((<any>req).body).
			then((attempt:number)=>{
				//respond back with an appropriate status code
				jsonHeader(res).status(statusCodeForSignup(attempt)).send(JSON.stringify(attempt));
			});
		});

		//login authentication
		this.app.post('/api/authenticate-user', (req:express.Request, res:express.Response) => {
			winston.debug("Attempting to login user");
			this.userBackend.authenticateUser((<any>req).body).
			then((result:AuthenticationResult)=>{
				//if authentic, store the user model in the session
				if(result.attempt==0){
					(<any>req).session.user=result.user;
				}
				//respond back with an appropriate status code
				jsonHeader(res).status(statusCodeForLogin(result.attempt)).send(JSON.stringify(result.attempt));
			});
		});

		//dummy empty post routes
		this.app.post('/api/post/empty', (req:express.Request, res:express.Response) => {
			winston.debug("empty post request");
			res.send("true");
		});

		//dummy empty get routes
		this.app.get('/api/get/empty', (req:express.Request, res:express.Response) => {
			winston.debug("empty get request");
			res.send("true");
		});

		//dummy empty put routes
		this.app.put('/api/put/empty', (req:express.Request, res:express.Response) => {
			winston.debug("empty put request");
			res.send("true");
		});

		//dummy empty delete routes
		this.app.delete('/api/delete/empty', (req:express.Request, res:express.Response) => {
			winston.debug("empty delete request");
			res.send("true");
		});

	}

    public start() {//this method is called after setRoutes()

		// this.schemaBackend.dropDatabaseSchema().then((v:any)=>{
		// 	// this.ensureDatabaseAndThenStartServer();
		// 	this.startServer();
		// });
		this.ensureDatabaseAndThenStartServer();
	}

	private ensureDatabaseAndThenStartServer(){
		this.schemaBackend.ensureDatabaseSchema()
			.then((lastClassCreated:ojs.Class)=>{
				this.startServer();
		});
	}

	private startServer(){
		//normalize ports by environment variables        
		let port=process.env.PORT_SANITY||3000;
		
		// http.createServer(express).listen(port);
		this.app.listen(port,()=>{
			winston.info("Server started on port "+port);
		});
	}

    private _homePage(req: express.Request, res: express.Response) {

		let pathToIndexPage:string;
		pathToIndexPage=path.join(__dirname,'../','dist/','index.html'); //amongst the main folders
		winston.log('info',"Server refreshed index file: "+pathToIndexPage);
        res.sendFile(pathToIndexPage);
    }
}

/**
 * Simple method that set the content header to be json. 
 * Returns the same response to allow chaining. 
 */
export function jsonHeader(response:express.Response):express.Response{
	response.setHeader('Content-Type', 'application/json');
	return response;
}

const production=process.env.NODE_ENV=='production';