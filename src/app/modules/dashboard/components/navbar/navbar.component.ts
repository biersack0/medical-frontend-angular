import { AuthService } from '@services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@interfaces/user.interface';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { SearchService } from '@services/search.service';
import { Doctor } from '@interfaces/doctor.interface';
import { Hospital } from '@interfaces/hospital.interface';

interface Searched {
	doctors?: Doctor[];
	users?: User[];
	hospitals?: Hospital[];
}

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
	user!: User;
	searched!: Searched;
	constructor(
		private authService: AuthService,
		private userService: UserService,
		private searchService: SearchService,
		private settingsService: SettingsService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getUser();
	}

	ngOnDestroy(): void {
		this.getUser().unsubscribe();
	}

	closeOpenSidebar() {
		this.settingsService.closeOpenSidebar();
	}

	getUser() {
		return this.userService.user$.subscribe({
			next: (user) => (this.user = user),
		});
	}

	search(term: string) {
		if (term == '') {
			this.searched = {
				doctors: [],
				users: [],
				hospitals: [],
			};
		}

		if (term.trim() !== '') {
			this.searchService.findAll(term).subscribe({
				next: ({ data }) => {
					this.searched = data;
				},
				error: (err) => {
					console.log(err);
				},
			});
		}
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	}

	goToProfile() {
		this.router.navigate(['/dashboard/profile']);
	}

	changeTheme() {
		this.settingsService.changePropertyTheme('data-theme', '');
	}
}
