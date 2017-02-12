import ojs= require('orientjs');
import winston=require('winston');
import Promise=require('bluebird');


const USER="User";
const LOCATION="Location";

export class SchemaBackend{

	

	constructor(private db:ojs.Db){
	}

	/**
	 * Warning: Drops the entire DB unsafely.
	 * Returns with the promise of the last class dropped in order
	 */
	dropDatabaseSchema():Promise<any>{
		winston.warn("Dropping DB unsafely");
		return this.db.query("DROP CLASS "+LOCATION+" IF EXISTS UNSAFE").
			then((v:any)=>{
				return this.db.query("DROP CLASS "+USER+" IF EXISTS UNSAFE")
			});
	}

	/**
	 * Checks if the classes in the database exist or not,
	 * and if not, creates the required classes.
	 */
	ensureDatabaseSchema():Promise<ojs.Class>{
		return this.ensureLocation().
		then((createdClass:ojs.Class)=>{
			return this.ensureUser();
		});
	}

	private ensureUser():Promise<ojs.Class>{
		return this.createClassIfNotExists(USER,[
			{name:"firstName",type:"String"},
			{name:"lastName",type:"String"},
			{name:"email",type:"String"},
			{name:"password",type:"String"},
			{name:"gender",type:"String"},
			{name:"linkToProfilePic",type:"String"},
			{name:"dateOfBirth",type:"Date"},
			{name:"address",type:"Embedded", linkedClass:LOCATION},
		],"V");
	}

	private ensureLocation():Promise<ojs.Class>{
		return this.createClassIfNotExists(LOCATION,[
			{name:"streetAddress",type:"String"},
			{name:"city",type:"String"},
			{name:"state",type:"String"},
			{name:"country",type:"String"},
			{name:"zipcode",type:"String"}
		]);
	}

	/**
	 * Creates a class that optionally extends the vertex class(V) and adds properties to that class.
	 * The properties  is an array of properties with known types.
	 * Meaning that they can only refer a type if it has been defined previously
	 * Each element must be of the form {name:"<name>",type:"<type>"} plus more(refer Property interface)
	 * Example:
	 * {name:"lastName",type:"String"},
	 * {name:"dateOfBirth",type:"Date"},
	 * {name:"favoriteWords",type:"EmbeddedList", linkedType:"String"},
	 * {name:"address",type:"Embedded", linkedClass:"Location"},//Location must be defined earlier
	 * @return the created class as a promise
	 */
	public createClassIfNotExists(className:string,propertiesWithKnownTypes:any[],superClass:string=null):Promise<ojs.Class>{
		return this.db.class.list(true).
		then((classes:ojs.Class[])=>{
			var found=false;
			winston.log("info","Searching for '"+className+"' class amongst "+classes.length+" classes");
			for(let singleClass of classes){
				if(singleClass.name==className){
					found=true;
					break;
				}
			}
			return found;
		}).then((foundClass:boolean)=>{
			if(!foundClass){
				let createdClassPromise:Promise<ojs.Class>=null;
				if(superClass!=null){
					createdClassPromise=this.db.class.create(className,superClass);
				}else{
					createdClassPromise=this.db.class.create(className);
				}
				
				return createdClassPromise.
					then((createdClass:ojs.Class)=>{
						winston.info("Created class : "+createdClass.name);
						winston.info("Defining properties for class : "+createdClass.name);
						return createdClass.property.create(propertiesWithKnownTypes).
						then((properties:ojs.Property[])=>{
							return createdClass;
						});
					}).catch((error:Error)=>{
						winston.log("error","Error occurred while adding properties to 'User' class "+error.message);
					});
			}
			winston.info(className+" class already exists");
			return null;
		}).catch((error:Error)=>{
			winston.log("error","Error occurred while ensuring '"+className+"' class "+error.message);
		});
	}
}