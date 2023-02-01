import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse, UsersResponse } from '@interfaces/index';
import { User } from '@interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
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

	get user$() {
		return this._user$;
	}

	setUser(user: User) {
		localStorage.setItem('user', JSON.stringify(user));
		this._user$.next(user);
	}

	constructor(private http: HttpClient) {
		this.apiUrl = environment.apiUrl;

		if (localStorage.getItem('user')) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const user: User = JSON.parse(localStorage.getItem('user')!);
			this.setUser(user);
		}
	}

	getUsers() {
		return this.http.get<UsersResponse>(`${this.apiUrl}/user`);
	}

	updateUser(id: string, name: string) {
		const data = { name };
		/* {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		} */
		return this.http.patch<UserResponse>(`${this.apiUrl}/user/${id}`, data);
	}
}
