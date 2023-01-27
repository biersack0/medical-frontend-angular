import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
