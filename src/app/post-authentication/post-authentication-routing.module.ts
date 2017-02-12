import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { TheirProfileComponent } from './their-profile/their-profile.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventComponent } from './event/event.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path:'home',
                component:HomeComponent,
				children:[
					{
						path:'dashboard',
						component:DashboardComponent
					},
					{
						path:'my-profile',
						component:MyProfileComponent
					},
					{
						path:'their-profile',
						component:TheirProfileComponent
					},
					{
						path:'create-event',
						component:CreateEventComponent
					},
					{
						path:'event',
						component:EventComponent
					}, 
					{
						path:'search',
						component:SearchComponent
					},
				]
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PostAuthenticationRoutingModule {}