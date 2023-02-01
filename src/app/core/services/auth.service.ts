import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '@interfaces/index';
import { UserService } from './user.service';

declare const google: any;

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiUrl: string;

	constructor(private http: HttpClient, private userService: UserService) {
		this.apiUrl = environment.apiUrl;
	}

	login(email: string, password: string) {
		const data = {
			email,
			password,
		};
		return this.http.post<LoginResponse>(`${this.apiUrl}/auth`, data);
	}

	loginGoogle(token: string) {
		const data = { token };
		return this.http.post<LoginResponse>(`${this.apiUrl}/auth/google`, data);
	}

	validateToken() {
		return this.http.get<LoginResponse>(`${this.apiUrl}/auth/renew`);
	}

	get token() {
		const token = localStorage.getItem('token') || '';
		return token;
	}

	logout() {
		if (localStorage.getItem('loginGoogle')) {
			google.accounts.id.revoke(this.userService.user$.getValue().email, () => {
				console.log('consent revoked');
			});
		}
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('loginGoogle');
	}
}
