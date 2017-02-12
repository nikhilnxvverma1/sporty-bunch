import { User } from './user';
import { Location } from './location';
import { Team } from './team';
import { Comment } from './comment';
import { SportType } from './sport-type';

export class GameEvent{
	name:string;
	/** Identifies the sport, could be 'others' (generic case) */
	sportType:SportType;
	/**Unless its 'others', this field is auto filled */
	sportName:string;
	/**Used by bing maps */
	venue:Location;
	date:Date;
	/** Transient,auto populated, used internally and starts from 0 for monday through 6 for sunday */
	dayNumber:number;
	/**Time in units. One unit is half hour */
	duration:number;
	teams:Team[]=[];//mostly it will only hold 2 elements;
	waitlisted:User[];
	interested:User[];
}