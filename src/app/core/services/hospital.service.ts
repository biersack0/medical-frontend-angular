import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from '@interfaces/hospital.interface';
import {
	HospitalResponse,
	HospitalsResponse,
	ResponseInterface,
} from '@interfaces/index';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class HospitalService {
	private apiUrl: string;
	private _hospital$ = new BehaviorSubject<Hospital>({
		_id: '',
		name: '',
	});

	private _refresh$ = new Subject<void>();

	get hospital$() {
		return this._hospital$;
	}

	setHospital(hospital: Hospital) {
		localStorage.setItem('hospital', JSON.stringify(hospital));
		this._hospital$.next(hospital);
	}

	get refresh$() {
		return this._refresh$;
	}

	constructor(private http: HttpClient) {
		this.apiUrl = environment.apiUrl;

		if (localStorage.getItem('hospital')) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const hospital: Hospital = JSON.parse(localStorage.getItem('hospital')!);
			this.setHospital(hospital);
		}
	}

	getHospitals(limit = 10, page = 1) {
		return this.http.get<HospitalsResponse>(
			`${this.apiUrl}/hospital?limit=${limit}&page=${page}`
		);
	}

	createHospital(name: string) {
		const data = { name };
		return this.http
			.post<HospitalResponse>(`${this.apiUrl}/hospital`, data)
			.pipe(tap(() => this._refresh$.next()));
	}

	updateHospital(id: string, name: string) {
		const data = { name };
		return this.http
			.patch<HospitalResponse>(`${this.apiUrl}/hospital/${id}`, data)
			.pipe(tap(() => this._refresh$.next()));
	}

	deleteHospital(id: string) {
		return this.http
			.delete<ResponseInterface>(`${this.apiUrl}/hospital/${id}`)
			.pipe(tap(() => this._refresh$.next()));
	}
}
