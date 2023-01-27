import { Component } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [],
})
export class SidebarComponent {
	routes = [
		{
			name: 'Home',
			path: '/dashboard',
			icon: 'uil-home-alt',
		},
		{
			name: 'Users',
			path: '/dashboard/users',
			icon: 'uil-users-alt',
		},
		{
			name: 'Doctors',
			path: '/dashboard/doctors',
			icon: 'uil-user-plus',
		},
		{
			name: 'Hospitals',
			path: '/dashboard/hospitals',
			icon: 'uil-building',
		},
	];
}
