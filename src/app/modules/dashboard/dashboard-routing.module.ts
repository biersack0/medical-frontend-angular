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
				data: { title: 'Inicio' },
			},
			{
				path: 'profile',
				component: ProfileComponent,
				data: { title: 'Mi Perfil' },
			},
			{
				path: 'doctors',
				component: DoctorsComponent,
				data: { title: 'Doctores' },
			},
			{
				path: 'hospitals',
				component: HospitalsComponent,
				data: { title: 'Hospitales' },
			},
			{
				path: 'users',
				component: UsersComponent,
				data: { title: 'Usuarios' },
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
