import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersResponse } from '@interfaces/index';
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
}
