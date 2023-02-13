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
			hospitalId: new FormControl(null, [Validators.required]),
		});
	}

	getHospitals() {
		this.hospitalService.getHospitals().subscribe({
			next: ({ data }) => {
				this.hospitals = data.hospitals;
				if (this.doctorToUpdate) {
					const { hospital } = this.doctorToUpdate;
					this.doctorForm.controls['hospitalId'].setValue(hospital);
				}
			},
		});
	}

	createDoctor() {
		this.doctorForm.markAllAsTouched();
		if (this.doctorForm.valid) {
			const { name, hospitalId } = this.doctorForm.value;

			if (this.isCreate) {
				this.doctorService.createDoctor(name, hospitalId._id).subscribe({
					next: () => {
						this.bsModalRef.hide();
						this.sweetAlertService.successAlert(false);
					},
					error: ({ error }) => {
						this.sweetAlertService.errorAlert(error);
					},
				});
			} else {
				this.doctorService
					.updateDoctor(this.doctorToUpdate!._id, name, hospitalId._id)
					.subscribe({
						next: ({ data }) => {
							this.bsModalRef.hide();
							this.sweetAlertService.successAlert(true);
							if (
								this.doctorService.doctor$.getValue()?._id ===
								this.doctorToUpdate?._id
							) {
								this.doctorService.setDoctor(data);
							}
						},
						error: ({ error }) => {
							this.sweetAlertService.errorAlert(error);
						},
					});
			}
		}
	}
}
