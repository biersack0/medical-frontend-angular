import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '@interfaces/index';
import { User } from '@interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';

declare const google: any;

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiUrl: string;
	userLocale!: User;
	// public msg = 'hola';

	msg = new BehaviorSubject<string>('mucho gusto');
	/* get msg() {
		return this._msg;
	} */
	/* set msg(value: string) {
		this._msg.next(value);
	} */

	constructor(private http: HttpClient) {
		this.apiUrl = environment.apiUrl;

		// this.userLocale = JSON.parse(localStorage.getItem('user') || '');
	}

	/* public set msg(ms: string) {
		this._msg.next(ms);
	} */

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
		const token = localStorage.getItem('token') || '';
		return token;
	}

	get user() {
		// return this.userLocale;
		const user: User = JSON.parse(localStorage.getItem('user') || '');
		return user;
	}

	/* set user(user: User) {
		// localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('user', JSON.stringify(user));
		this.userLocale = user;
	} */

	logout() {
		if (localStorage.getItem('loginGoogle')) {
			google.accounts.id.revoke(this.user.email, () => {
				console.log('consent revoked');
			});
		}
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('loginGoogle');
	}
}
