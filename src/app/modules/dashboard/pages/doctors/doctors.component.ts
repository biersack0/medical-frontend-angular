import { Component, OnDestroy, OnInit } from '@angular/core';
import { Doctor } from '@interfaces/doctor.interface';
import { DoctorService } from '@services/doctor.service';
import { SearchService } from '@services/search.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
import { DoctorModalComponent } from 'src/app/shared/components/modals/doctor-modal/doctor-modal.component';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
	selector: 'app-doctors',
	templateUrl: './doctors.component.html',
	styles: [],
})
export class DoctorsComponent implements OnInit, OnDestroy {
	doctors: Doctor[] = [];
	doctorsTemp: Doctor[] = [];
	currentPage = 1;
	totalDoctors = 0;
	bsModalRef?: BsModalRef;
	subscription!: Subscription;

	constructor(
		private doctorService: DoctorService,
		private searchService: SearchService,
		private modalService: BsModalService,
		private sweetAlertService: SweetAlertService
	) {}

	ngOnInit(): void {
		if (
			localStorage.getItem('currentPage') &&
			localStorage.getItem('totalDoctors')
		) {
			this.currentPage = Number(localStorage.getItem('currentPage')!);
			this.totalDoctors = Number(localStorage.getItem('totalDoctors')!);
		}

		this.getDoctors(10, this.currentPage);

		this.subscription = this.doctorService.refresh$.subscribe(() => {
			this.getDoctors(10, this.currentPage);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		localStorage.removeItem('currentPage');
		localStorage.removeItem('totalDoctors');
	}

	getDoctors(limit = 10, page = 1) {
		this.doctorService.getDoctors(limit, page).subscribe({
			next: ({ data }) => {
				this.doctors = data.doctors;
				this.doctorsTemp = data.doctors;
				this.totalDoctors = data.total;
				localStorage.setItem('totalDoctors', String(this.totalDoctors));
			},
		});
	}

	search(value: string) {
		if (value == '') {
			this.doctors = this.doctorsTemp;
		}

		if (value.trim() !== '') {
			this.searchService.findByCollection('doctor', value).subscribe({
				next: ({ data }) => {
					this.doctors = data;
				},
			});
		}
	}

	addDoctor() {
		this.bsModalRef = this.modalService.show(DoctorModalComponent, {
			class: 'modal-dialog-centered',
		});
	}

	updateDoctor(doctor: Doctor) {
		const initialState = {
			doctorToUpdate: doctor,
			isCreate: false,
		};

		/* this.bsModalRef = this.modalService.show(HospitalModalComponent, {
			initialState,
			class: 'modal-dialog-centered',
		}); */
	}

	deleteDoctor(id: string) {
		this.doctorService.deleteDoctor(id).subscribe({
			next: () =>
				this.sweetAlertService.successAlert(
					false,
					'Doctor eliminado',
					'El doctor fue eliminado.'
				),
		});
	}

	getDoctorsByPage(event: PageChangedEvent): void {
		localStorage.setItem('currentPage', JSON.stringify(event.page));
		this.currentPage = event.page;

		this.getDoctors(10, event.page);
	}
}
