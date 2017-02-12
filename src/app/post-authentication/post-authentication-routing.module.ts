import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path:'home',
                component:HomeComponent,
				children:[
					{
						path:'',
						component:DashboardComponent
					},
					{
						path:'my-profile',
						component:MyProfileComponent
					}
				]
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {}