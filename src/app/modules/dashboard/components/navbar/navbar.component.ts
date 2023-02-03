import { AuthService } from '@services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@interfaces/user.interface';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
	user!: User;
	constructor(
		private authService: AuthService,
		private userService: UserService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getUser();
	}

	ngOnDestroy(): void {
		this.getUser().unsubscribe();
	}

	getUser() {
		return this.userService.user$.subscribe({
			next: (user) => (this.user = user),
		});
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	}

	goToProfile() {
		this.router.navigate(['/dashboard/profile']);
	}
}
