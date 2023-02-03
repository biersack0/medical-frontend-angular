import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseInterface } from '@interfaces/index';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	private apiUrl: string;

	constructor(private http: HttpClient) {
		this.apiUrl = environment.apiUrl;
	}

	findAll(value: string) {
		return this.http.get<ResponseInterface>(`${this.apiUrl}/search/${value}`);
	}

	findByCollection(type: 'doctor' | 'user' | 'hospital', value: string) {
		return this.http.get<ResponseInterface>(
			`${this.apiUrl}/search/${type}/${value}`
		);
	}
}
