import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { HospitalsComponent } from './pages/hospitals/hospitals.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
	declarations: [
		DashboardComponent,
		UsersComponent,
		DoctorsComponent,
		HospitalsComponent,
		SidebarComponent,
		NavbarComponent,
		FooterComponent,
		BreadcrumbComponent,
		HomeComponent,
		ProfileComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		DashboardRoutingModule,
		SharedModule,
	],
})
export class DashboardModule {}
