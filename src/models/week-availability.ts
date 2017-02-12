export class WeekAvailability{
	/** 
	 * Starts from 0 for monday, goes till 6(inclusive) for sunday,in each row. 
	 * Columns store time slices in units of half hour 
	 */
	days:boolean[][];

	constructor(){
		this.initializeWeekSchedule();
	}

	initializeWeekSchedule(){
		for(let i=0;i<7;i++){
			this.days[i]=[];
			for(let j=0;i<24*2;j++){
				this.days[i][j]=false;
			}
		}
	}
}