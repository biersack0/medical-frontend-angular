import { SweetAlertService } from './../../../services/sweet-alert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ValidationUtils } from 'src/app/shared/utils/validation-utils';
import { User } from '@interfaces/user.interface';

@Component({
	selector: 'app-user-modal',
	templateUrl: './user-modal.component.html',
	styles: [],
})
export class UserModalComponent implements OnInit {
	userToUpdate?: User;
	isCreate = true;
	userForm!: FormGroup;
	stateUser = [
		{ value: true, name: 'Activo' },
		{ value: false, name: 'Inactivo' },
	];

	constructor(
		public bsModalRef: BsModalRef,
		private userService: UserService,
		private sweetAlertService: SweetAlertService
	) {}

	ngOnInit(): void {
		this.initUserForm();

		if (this.userToUpdate) {
			this.userForm.get('name')?.setValue(this.userToUpdate.name);
			this.userForm.get('email')?.setValue(this.userToUpdate.email);
			this.userForm.get('isActive')?.setValue(this.userToUpdate.isActive);
		}
	}

	initUserForm() {
		this.userForm = new FormGroup({
			name: new FormControl('', [Validators.required, Validators.minLength(3)]),
			email: new FormControl('', [
				Validators.required,
				new ValidationUtils().isValidEmail(),
			]),
			password: new FormControl('00000000', [
				Validators.required,
				Validators.minLength(8),
			]),
			isActive: new FormControl(true, [Validators.required]),
		});
	}

	createUser() {
		this.userForm.markAllAsTouched();
		if (this.userForm.valid) {
			const { email, password, name, isActive } = this.userForm.value;

			if (this.isCreate) {
				this.userService.createUser(email, password, name, isActive).subscribe({
					next: () => {
						this.bsModalRef.hide();
						this.sweetAlertService.successAlert(false);
					},
					error: ({ error }) => {
						this.sweetAlertService.errorAlert(error);
					},
				});
			} else {
				this.userService
					.updateUser(this.userToUpdate!._id, name, isActive)
					.subscribe({
						next: ({ data }) => {
							this.bsModalRef.hide();
							this.sweetAlertService.successAlert(true);
							if (
								this.userService.user$.getValue()._id === this.userToUpdate?._id
							) {
								this.userService.setUser(data);
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
