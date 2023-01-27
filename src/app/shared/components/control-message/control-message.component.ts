import { Component, ElementRef, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationUtils } from '../../utils/ValidationUtils';

@Component({
	selector: 'app-control-message',
	templateUrl: './control-message.component.html',
	styleUrls: ['./control-message.component.scss'],
})
export class ControlMessageComponent extends ValidationUtils {
	@Input() control!: AbstractControl;
	@Input() customMessages: any;

	constructor(private el: ElementRef<HTMLElement>) {
		super();
	}

	get message() {
		if (this.control) {
			const { touched, errors, valid } = this.control;
			this.addClass(!valid && touched);

			for (const errorName in errors) {
				if (touched) {
					return this.customMessages && this.customMessages[errorName]
						? this.customMessages[errorName]
						: this.getMessage(errorName, errors[errorName]);
				}
			}
			return null;
		}
	}

	addClass(isValid: boolean | null) {
		const classInput =
			this.el.nativeElement.getElementsByTagName('input')[0].classList;

		isValid ? classInput.add('is-invalid') : classInput.remove('is-invalid');
	}
}
