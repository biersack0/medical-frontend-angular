import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@interfaces/user.interface';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { ValidationUtils } from 'src/app/shared/utils/validation-utils';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styles: [],
})
export class ProfileComponent implements OnInit {
	profileForm!: FormGroup;
	isLoading = false;
	user!: User;

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private ref: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.user = this.authService.user;
		this.initProfileForm();
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
	updateProfile() {
		this.profileForm.markAllAsTouched();
		if (this.profileForm.valid) {
			const { name } = this.profileForm.value;
			this.userService.updateUser(this.user._id, name).subscribe({
				next: ({ data }) => {
					// localStorage.setItem('user', JSON.stringify(data));
					// this.authService.userLocale = data;
				},
			});
			this.authService.msg.next(name);

			this.ref.detectChanges();
		}
	}
}
