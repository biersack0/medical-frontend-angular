import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class SweetAlertService {
	simpleAlert(icon: any, title: string, text: string) {
		Swal.fire({ icon, title, text });
	}

	successAlert(isEdit: boolean, title?: string, text?: string) {
		title = title ? title : isEdit ? 'Datos Actualizados' : 'Datos Registrados';
		text = text
			? text
			: isEdit
			? 'Los datos han sido actualizados correctamente.'
			: 'Los datos han sido registrados correctamente.';
		this.simpleAlert('success', title, text);
	}

	errorAlert(error: any) {
		const getStrings = (arr: []): string[] => {
			return arr.reduce(
				(result: any[], obj: any) => result.concat(...Object.values(obj)),
				[]
			);
		};

		if (error.errors) {
			Swal.fire({
				title: `${error.message}`,
				html: `${getStrings(error.errors).join('<br>')}`,
				icon: 'error',
				confirmButtonText: 'Cerrar',
			});
		}

		Swal.fire({
			title: 'Error',
			text: `${error.message}`,
			icon: 'error',
			confirmButtonText: 'Cerrar',
		});
	}

	htmlAlert() {
		// html alert
	}
}
