import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hospital } from '@interfaces/hospital.interface';
import { HospitalService } from '@services/hospital.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
	selector: 'app-hospital-modal',
	templateUrl: './hospital-modal.component.html',
	styles: [],
})
export class HospitalModalComponent implements OnInit {
	hospitalToUpdate?: Hospital;
	isCreate = true;
	hospitalForm!: FormGroup;

	constructor(
		public bsModalRef: BsModalRef,
		private hospitalService: HospitalService,
		private sweetAlertService: SweetAlertService
	) {}

	ngOnInit(): void {
		this.initHospitalForm();

		if (this.hospitalToUpdate) {
			this.hospitalForm.get('name')?.setValue(this.hospitalToUpdate.name);
		}
	}

	initHospitalForm() {
		this.hospitalForm = new FormGroup({
			name: new FormControl('', [Validators.required, Validators.minLength(3)]),
		});
	}

	createHospital() {
		this.hospitalForm.markAllAsTouched();
		if (this.hospitalForm.valid) {
			const { name } = this.hospitalForm.value;

			if (this.isCreate) {
				this.hospitalService.createHospital(name).subscribe({
					next: () => {
						this.bsModalRef.hide();
						this.sweetAlertService.successAlert(false);
					},
					error: ({ error }) => {
						this.sweetAlertService.errorAlert(error);
					},
				});
			} else {
				this.hospitalService
					.updateHospital(this.hospitalToUpdate!._id, name)
					.subscribe({
						next: ({ data }) => {
							this.bsModalRef.hide();
							this.sweetAlertService.successAlert(true);
							if (
								this.hospitalService.hospital$.getValue()._id ===
								this.hospitalToUpdate?._id
							) {
								this.hospitalService.setHospital(data);
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
