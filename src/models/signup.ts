import { Location } from './location';

export class Signup{
	firstName:string;
	lastName:string;
	email:string;
	password:string;
	dateOfBirth:Date;
	address:Location=new Location();
}