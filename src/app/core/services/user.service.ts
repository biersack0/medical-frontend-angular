import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ResponseInterface,
	UserResponse,
	UsersResponse,
} from '@interfaces/index';
import { User } from '@interfaces/user.interface';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private apiUrl: string;
	private _user$ = new BehaviorSubject<User>({
		_id: '',
		name: '',
		email: '',
		password: '',
		role: '',
		hasGoogle: false,
		isActive: true,
	});

	private _refresh$ = new Subject<void>();

	get user$() {
		return this._user$;
	}

	setUser(user: User) {
		localStorage.setItem('user', JSON.stringify(user));
		this._user$.next(user);
	}

	get refresh$() {
		return this._refresh$;
	}

	constructor(private http: HttpClient) {
		this.apiUrl = environment.apiUrl;

		if (localStorage.getItem('user')) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const user: User = JSON.parse(localStorage.getItem('user')!);
			this.setUser(user);
		}
	}

	getUsers(limit = 10, page = 1) {
		return this.http.get<UsersResponse>(
			`${this.apiUrl}/user?limit=${limit}&page=${page}`
		);
	}

	createUser(email: string, password: string, name: string, isActive: boolean) {
		const data = { email, password, name, isActive };
		return this.http
			.post<UserResponse>(`${this.apiUrl}/user`, data)
			.pipe(tap(() => this._refresh$.next()));
	}

	updateUser(id: string, name: string, isActive?: boolean) {
		const data = { name, isActive };
		return this.http
			.patch<UserResponse>(`${this.apiUrl}/user/${id}`, data)
			.pipe(tap(() => this._refresh$.next()));
	}

	deleteUser(id: string) {
		return this.http
			.delete<ResponseInterface>(`${this.apiUrl}/user/${id}`)
			.pipe(tap(() => this._refresh$.next()));
	}
}
