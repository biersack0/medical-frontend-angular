import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessageComponent } from './components/control-message/control-message.component';
import { NotImagePipe } from './pipes/not-image.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserModalComponent } from './components/modals/user-modal/user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HospitalModalComponent } from './components/modals/hospital-modal/hospital-modal.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { DoctorModalComponent } from './components/modals/doctor-modal/doctor-modal.component';
@NgModule({
	declarations: [
		ControlMessageComponent,
		NotImagePipe,
		SafePipe,
		UserModalComponent,
		HospitalModalComponent,
		UploadImageComponent,
		DoctorModalComponent,
	],
	imports: [
		CommonModule,
		NgSelectModule,
		ReactiveFormsModule,
		ModalModule.forRoot(),
	],
	exports: [
		ControlMessageComponent,
		UserModalComponent,
		HospitalModalComponent,
		NotImagePipe,
		SafePipe,
		UploadImageComponent,
		DoctorModalComponent,
	],
})
export class SharedModule {}
