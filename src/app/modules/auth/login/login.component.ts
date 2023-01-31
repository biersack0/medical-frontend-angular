import {
	AfterViewInit,
	Component,
	ElementRef,
	NgZone,
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

	constructor(
		private router: Router,
		private authService: AuthService,
		private ngZone: NgZone
	) {}

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
			remember: new FormControl(false),
		});
	}

	login() {
		this.loginForm.markAllAsTouched();
		if (this.loginForm.valid) {
			const { email, password, remember } = this.loginForm.value;

			this.isLoading = true;

			this.authService
				.login(email, password)
				.pipe(finalize(() => (this.isLoading = false)))
				.subscribe({
					next: ({ data }) => {
						const { access_token, user } = data;
						localStorage.setItem('token', access_token);
						localStorage.setItem('user', JSON.stringify(user));

						if (remember) {
							localStorage.setItem('remember', JSON.stringify(remember));
						}

						this.router.navigate(['/dashboard']);
					},
					error: ({ error }) => {
						if (error.errors) {
							const getStrings = (arr: []): string[] => {
								return arr.reduce(
									(result: any[], obj: any) =>
										result.concat(...Object.values(obj)),
									[]
								);
							};

							Swal.fire({
								title: `${error.message}`,
								html: `${getStrings(error.errors).join('<br>')}`,
								icon: 'error',
								confirmButtonText: 'Close',
							});
						}

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

	initGoogle() {
		google.accounts.id.initialize({
			client_id:
				'978287541699-odnrojssenjn7g83h811k8eaf8rf22c4.apps.googleusercontent.com',
			callback: (response: any) =>
				this.ngZone.run(() => {
					this.loginGoggle(response);
				}),
		});
		google.accounts.id.renderButton(this.googleBtn.nativeElement, {
			theme: 'outline',
			size: 'large',
			width: '250px',
		});
		google.accounts.id.prompt();
	}

	loginGoggle(response: any) {
		this.authService.loginGoogle(response.credential).subscribe({
			next: ({ data }) => {
				const { access_token, user } = data;
				localStorage.setItem('token', access_token);
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('loginGoogle', 'true');

				this.router.navigate(['/dashboard']);
			},
		});
	}

	togglePassword() {
		this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
	}

	goToRegister() {
		this.router.navigate(['/register']);
	}
}
