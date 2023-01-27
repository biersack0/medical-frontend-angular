import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidationUtils {
	isValidEmail(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const value: string = control.value;
			const emailRegex =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail|outlook|hotmail).(com)$/;

			if (!emailRegex.test(value)) {
				return { email: true };
			}
			return null;
		};
	}
}
