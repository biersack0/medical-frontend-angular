import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export class ValidationUtils {
	isInvalid(control: AbstractControl) {
		return control.errors && control.touched;
	}

	getMessage(errorName: string, errorValue: any) {
		// console.log(errorName, errorValue);

		switch (errorName) {
			case 'required':
				return 'Campo requerido';
			case 'email':
				return 'El correo no es válido';
			case 'pattern':
				return 'No cumple con el formato permitido';
			case 'minlength':
				return `Debe tener al menos ${errorValue.requiredLength} caracteres`;
			case 'maxlength':
				return `Sólo se permiten ${errorValue.requiredLength} caracteres`;
			default:
				return null;
		}
	}

	isValidEmail(control: AbstractControl): { [key: string]: boolean } | null {
		const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
		return null;
	}

	requiredAfterTrim(
		control: AbstractControl
	): { [key: string]: boolean } | null {
		if (control.value && control.value.trim()) {
			return { required: true };
		}
		return null;
	}
}
