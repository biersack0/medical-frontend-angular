import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '@interfaces/doctor.interface';
import { Hospital } from '@interfaces/hospital.interface';
import { DoctorService } from '@services/doctor.service';
import { HospitalService } from '@services/hospital.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
	selector: 'app-doctor-modal',
	templateUrl: './doctor-modal.component.html',
	styles: [],
})
export class DoctorModalComponent implements OnInit {
	doctorToUpdate?: Doctor;
	isCreate = true;
	doctorForm!: FormGroup;
	hospitals: Hospital[] = [];

	constructor(
		public bsModalRef: BsModalRef,
		private hospitalService: HospitalService,
		private doctorService: DoctorService,
		private sweetAlertService: SweetAlertService
	) {}

	ngOnInit(): void {
		this.initDoctorForm();

		if (this.doctorToUpdate) {
			this.doctorForm.get('name')?.setValue(this.doctorToUpdate.name);
		}

		this.getHospitals();
	}

	initDoctorForm() {
		this.doctorForm = new FormGroup({
			name: new FormControl('', [Validators.required, Validators.minLength(3)]),
			hospitalId: new FormControl('', [Validators.required]),
		});
	}

	getHospitals() {
		this.hospitalService.getHospitals().subscribe({
			next: ({ data }) => {
				this.hospitals = data.hospitals;
			},
		});
	}

	createDoctor() {
		this.doctorForm.markAllAsTouched();
		if (this.doctorForm.valid) {
			const { name, hospitalId } = this.doctorForm.value;

			this.doctorService.createDoctor(name, hospitalId).subscribe({
				next: () => {
					this.bsModalRef.hide();
					this.sweetAlertService.successAlert(false);
				},
				error: ({ error }) => {
					this.sweetAlertService.errorAlert(error);
				},
			});
		}
	}
}
