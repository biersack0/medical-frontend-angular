import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('@modules/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: 'dashboard',
		loadChildren: () =>
			import('@modules/dashboard/dashboard.module').then(
				(m) => m.DashboardModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'not-found',
		loadComponent: () =>
			import('@modules/not-found/not-found.component').then(
				(c) => c.NotFoundComponent
			),
	},
	{
		path: '**',
		redirectTo: 'not-found',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
