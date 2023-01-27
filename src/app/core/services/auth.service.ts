import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '@interfaces/index';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiUrl: string;

	constructor(private http: HttpClient) {
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

	validateToken(token: string) {
		return this.http.get<LoginResponse>(`${this.apiUrl}/auth/renew`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	get token() {
		return '';
	}

	clearData() {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	}
}
