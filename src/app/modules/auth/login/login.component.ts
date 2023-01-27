import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { finalize } from 'rxjs';
import { ValidationUtils } from 'src/app/shared/utils/validation-utils';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
	loginForm!: FormGroup;
	passwordType = 'password';
	isLoading = false;
	@ViewChild('googleBtn') googleBtn!: ElementRef;

	constructor(private router: Router, private authService: AuthService) {}

	ngOnInit(): void {
		this.initLoginForm();
	}

	ngAfterViewInit(): void {
		this.initGoogle();
	}

	initLoginForm() {
		this.loginForm = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				new ValidationUtils().isValidEmail(),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
			]),
		});
	}

	login() {
		this.loginForm.markAllAsTouched();
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value;

			this.isLoading = true;

			this.authService
				.login(email, password)
				.pipe(finalize(() => (this.isLoading = false)))
				.subscribe({
					next: ({ data }) => {
						const { access_token, user } = data;
						localStorage.setItem('token', access_token);
						localStorage.setItem('user', JSON.stringify(user));
						this.router.navigate(['/dashboard']);
					},
					error: ({ error }) => {
						Swal.fire({
							title: 'Error',
							text: `${error.message}`,
							icon: 'error',
							confirmButtonText: 'Close',
						});
					},
				});
		}
	}

	loginGoggle() {
		// login google
	}

	initGoogle() {
		google.accounts.id.initialize({
			client_id:
				'978287541699-odnrojssenjn7g83h811k8eaf8rf22c4.apps.googleusercontent.com',
			callback: (response: any) => this.handleCredentialResponse(response),
		});
		google.accounts.id.renderButton(this.googleBtn.nativeElement, {
			theme: 'outline',
			size: 'large',
			width: '250px',
		});
		google.accounts.id.prompt();
	}

	handleCredentialResponse(response: any) {
		console.log('Encoded JWT ID token: ' + response.credential);
	}

	togglePassword() {
		this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
	}

	goToRegister() {
		this.router.navigate(['/register']);
	}
}
