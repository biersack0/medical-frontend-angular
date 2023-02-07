import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '@interfaces/doctor.interface';
import {
	DoctorResponse,
	DoctorsResponse,
	ResponseInterface,
} from '@interfaces/index';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class DoctorService {
	private apiUrl: string;
	private _doctor$ = new BehaviorSubject<Doctor | null>(null);

	private _refresh$ = new Subject<void>();

	get doctor$() {
		return this._doctor$;
	}

	setDoctor(doctor: Doctor) {
		localStorage.setItem('doctor', JSON.stringify(doctor));
		this._doctor$.next(doctor);
	}

	get refresh$() {
		return this._refresh$;
	}

	constructor(private http: HttpClient) {
		this.apiUrl = environment.apiUrl;

		if (localStorage.getItem('doctor')) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const doctor: Doctor = JSON.parse(localStorage.getItem('doctor')!);
			this.setDoctor(doctor);
		}
	}

	getDoctors(limit = 10, page = 1) {
		return this.http.get<DoctorsResponse>(
			`${this.apiUrl}/doctor?limit=${limit}&page=${page}`
		);
	}

	createDoctor(name: string, hospitalId: string) {
		const data = { name, hospital: hospitalId };
		return this.http
			.post<DoctorResponse>(`${this.apiUrl}/doctor`, data)
			.pipe(tap(() => this._refresh$.next()));
	}

	updateDoctor(id: string, name: string) {
		const data = { name };
		return this.http
			.patch<DoctorResponse>(`${this.apiUrl}/doctor/${id}`, data)
			.pipe(tap(() => this._refresh$.next()));
	}

	deleteDoctor(id: string) {
		return this.http
			.delete<ResponseInterface>(`${this.apiUrl}/doctor/${id}`)
			.pipe(tap(() => this._refresh$.next()));
	}
}
