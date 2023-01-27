import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationUtils } from 'src/app/shared/utils/validation-utils';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	registerForm!: FormGroup;
	passwordType = 'password';

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.initRegisterForm();
	}

	initRegisterForm() {
		this.registerForm = new FormGroup({
			name: new FormControl('', [Validators.required, Validators.minLength(3)]),
			email: new FormControl('', [
				Validators.required,
				new ValidationUtils().isValidEmail(),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
			]),
			terms: new FormControl(false, [Validators.requiredTrue]),
		});
	}

	register() {
		this.registerForm.markAllAsTouched();
		if (this.registerForm.valid) {
			const { name, email, password } = this.registerForm.value;
			console.log(name, email, password);
		}
	}

	togglePassword() {
		this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
	}

	goToLogin() {
		this.router.navigate(['/login']);
	}

	registerGoggle() {
		// login google
	}
}
