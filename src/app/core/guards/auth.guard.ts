import { AuthService } from '@services/auth.service';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const token = this.authService.token;

		this.authService.validateToken(token).subscribe({
			next: () => {
				return true;
			},
			error: () => {
				this.router.navigateByUrl('login');
				return false;
			},
		});

		return true;
	}
}
