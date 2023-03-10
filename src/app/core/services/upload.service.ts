import { HospitalService } from '@services/hospital.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UploadResponse } from '@interfaces/index';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

type typesToUpload = 'doctor' | 'hospital' | 'user';

@Injectable({
	providedIn: 'root',
})
export class UploadService {
	private apiUrl: string;

	constructor(
		private http: HttpClient,
		private hospitalService: HospitalService
	) {
		this.apiUrl = environment.apiUrl;
	}

	uploadImage(file: File, id: string, type: typesToUpload) {
		const formData = new FormData();
		formData.append('file', file);

		return this.http
			.post<UploadResponse>(`${this.apiUrl}/upload/${type}/${id}`, formData)
			.pipe(tap(() => this.hospitalService.refresh$.next()));
	}
}
