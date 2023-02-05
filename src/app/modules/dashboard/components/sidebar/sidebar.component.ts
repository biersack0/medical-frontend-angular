import { Component } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [],
})
export class SidebarComponent {
	routes = [
		{
			name: 'Inicio',
			path: '/dashboard',
			icon: 'uil-home-alt',
		},
		{
			name: 'Mi perfil',
			path: '/dashboard/profile',
			icon: 'uil-user',
		},
		{
			name: 'Usuarios',
			path: '/dashboard/users',
			icon: 'uil-users-alt',
		},
		{
			name: 'Hospitales',
			path: '/dashboard/hospitals',
			icon: 'uil-building',
		},
		{
			name: 'Doctores',
			path: '/dashboard/doctors',
			icon: 'uil-user-plus',
		},
	];
}
