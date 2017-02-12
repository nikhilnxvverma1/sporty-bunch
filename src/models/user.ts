import { WeekAvailability } from './week-availability';
import { SportType } from './sport-type';

export class User{
	firstName:string;
	lastName:string;
	email:string;
	password:string;
	linkToProfilePic:string;
	address:Location;
	availability:WeekAvailability;
	preferredSports:SportType[]=[];
}