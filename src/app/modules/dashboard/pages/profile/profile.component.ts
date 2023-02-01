import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@interfaces/user.interface';
import { UploadService } from '@services/upload.service';
import { UserService } from '@services/user.service';
import { ValidationUtils } from 'src/app/shared/utils/validation-utils';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styles: [],
})
export class ProfileComponent implements OnInit {
	profileForm!: FormGroup;
	uploadForm!: FormGroup;
	isLoading = false;
	user!: User;
	imageToUpload: File | undefined;
	imagePrev: any;

	constructor(
		private uploadService: UploadService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.user = this.userService.user$.getValue();
		this.initProfileForm();
		this.initUploadForm();
	}

	initProfileForm() {
		this.profileForm = new FormGroup({
			name: new FormControl(this.user.name, [
				Validators.required,
				Validators.minLength(3),
			]),
			email: new FormControl(this.user.email, [
				Validators.required,
				new ValidationUtils().isValidEmail(),
			]),
		});
	}

	initUploadForm() {
		this.uploadForm = new FormGroup({
			image: new FormControl(''),
		});
	}

	updateProfile() {
		this.profileForm.markAllAsTouched();
		if (this.profileForm.valid) {
			const { name } = this.profileForm.value;
			this.userService.updateUser(this.user._id, name).subscribe({
				next: ({ data }) => {
					Swal.fire({
						title: 'Éxito',
						text: 'Los datos se actualizaron correctamente.',
						icon: 'success',
						confirmButtonText: 'Cerrar',
					});
					this.userService.setUser(data);
				},
			});
		}
	}

	changeImage(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];

		if (file != undefined) {
			const fileSize = file?.size / 1024 / 1024;
			const formatAllowed = [
				'image/jpg',
				'image/jpeg',
				'image/png',
				'image/webp',
			];

			if (!formatAllowed.includes(file.type)) {
				Swal.fire({
					title: 'Error',
					text: 'Solo está permitido los archivos jpg, jpeg, png, webp',
					icon: 'error',
					confirmButtonText: 'Cerrar',
				});
				return;
			}

			if (fileSize > 1) {
				Swal.fire({
					title: 'Error',
					text: 'La imagen debe ser menor a 1 Mb',
					icon: 'error',
					confirmButtonText: 'Cerrar',
				});
				return;
			}

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				this.imagePrev = reader.result;
			};

			this.imageToUpload = file;
		}
	}

	uploadImage() {
		if (this.imageToUpload != undefined) {
			this.uploadService
				.uploadImage(this.imageToUpload, this.user._id, 'user')
				.subscribe({
					next: ({ data }) => {
						this.userService.setUser(data);
					},
				});
		}
	}
}
