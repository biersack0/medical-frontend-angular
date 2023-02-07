import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Doctor } from '@interfaces/doctor.interface';
import { Hospital } from '@interfaces/hospital.interface';
import { UploadService } from '@services/upload.service';
import Swal from 'sweetalert2';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
	selector: 'app-upload-image',
	templateUrl: './upload-image.component.html',
	styles: [],
})
export class UploadImageComponent {
	@Input() type!: 'user' | 'hospital' | 'doctor';
	@Input() model!: Hospital | Doctor;
	uploadForm!: FormGroup;
	imageToUpload: File | undefined;
	imagePrev: any;

	constructor(
		private uploadService: UploadService,
		private sweetAlertService: SweetAlertService
	) {
		this.initUploadForm();
	}

	initUploadForm() {
		this.uploadForm = new FormGroup({
			image: new FormControl(''),
		});
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
				.uploadImage(this.imageToUpload, this.model._id, this.type)
				.subscribe({
					next: () => {
						this.sweetAlertService.successAlert(
							false,
							'Imagen Cargada',
							'Se añadio la imagen.'
						);
					},
				});
		}
	}
}
