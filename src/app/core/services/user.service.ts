import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse, UsersResponse } from '@interfaces/index';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private apiUrl: string;

	constructor(private http: HttpClient) {
		this.apiUrl = environment.apiUrl;
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
