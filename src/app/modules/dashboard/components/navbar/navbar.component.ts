import { AuthService } from '@services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@interfaces/user.interface';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: [],
})
export class NavbarComponent implements OnInit {
	user!: User;
	message = '';

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.user = this.authService.user;
		this.authService.msg.subscribe({
			next: (res) => {
				this.message = res;
			},
		});
		// console.log('message', this.authService.message);
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	}

	goToProfile() {
		this.router.navigate(['/profile']);
	}
}
