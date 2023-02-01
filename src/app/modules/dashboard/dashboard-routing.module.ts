import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { HospitalsComponent } from './pages/hospitals/hospitals.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: '',
				component: HomeComponent,
			},
			{
				path: 'profile',
				component: ProfileComponent,
			},
			{
				path: 'doctors',
				component: DoctorsComponent,
			},
			{
				path: 'hospitals',
				component: HospitalsComponent,
			},
			{
				path: 'users',
				component: UsersComponent,
			},
			{ path: '', pathMatch: 'full', redirectTo: '' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
