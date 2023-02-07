import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hospital } from '@interfaces/hospital.interface';
import { HospitalService } from '@services/hospital.service';
import { SearchService } from '@services/search.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
import { HospitalModalComponent } from 'src/app/shared/components/modals/hospital-modal/hospital-modal.component';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
	selector: 'app-hospitals',
	templateUrl: './hospitals.component.html',
	styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
	hospitals: Hospital[] = [];
	hospitalsTemp: Hospital[] = [];
	currentPage = 1;
	totalHospitals = 0;
	bsModalRef?: BsModalRef;
	subscription!: Subscription;

	constructor(
		private hospitalService: HospitalService,
		private searchService: SearchService,
		private modalService: BsModalService,
		private sweetAlertService: SweetAlertService
	) {}

	ngOnInit(): void {
		if (
			localStorage.getItem('currentPage') &&
			localStorage.getItem('totalHospitals')
		) {
			this.currentPage = Number(localStorage.getItem('currentPage')!);
			this.totalHospitals = Number(localStorage.getItem('totalHospitals')!);
		}

		this.getHospitals(10, this.currentPage);

		this.subscription = this.hospitalService.refresh$.subscribe(() => {
			this.getHospitals(10, this.currentPage);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		localStorage.removeItem('currentPage');
		localStorage.removeItem('totalHospitals');
	}

	getHospitals(limit = 10, page = 1) {
		this.hospitalService.getHospitals(limit, page).subscribe({
			next: ({ data }) => {
				this.hospitals = data.hospitals;
				this.hospitalsTemp = data.hospitals;
				this.totalHospitals = data.total;
				localStorage.setItem('totalHospitals', String(this.totalHospitals));
			},
		});
	}

	search(value: string) {
		if (value == '') {
			this.hospitals = this.hospitalsTemp;
		}

		if (value.trim() !== '') {
			this.searchService.findByCollection('hospital', value).subscribe({
				next: ({ data }) => {
					this.hospitals = data;
				},
			});
		}
	}

	addHospital() {
		this.bsModalRef = this.modalService.show(HospitalModalComponent, {
			class: 'modal-dialog-centered',
		});
	}

	updateHospital(hospital: Hospital) {
		const initialState = {
			hospitalToUpdate: hospital,
			isCreate: false,
		};

		this.bsModalRef = this.modalService.show(HospitalModalComponent, {
			initialState,
			class: 'modal-dialog-centered',
		});
	}

	deleteHospital(id: string) {
		this.hospitalService.deleteHospital(id).subscribe({
			next: () =>
				this.sweetAlertService.successAlert(
					false,
					'Hospital eliminado',
					'El hospital fue eliminado.'
				),
		});
	}

	getHospitalsByPage(event: PageChangedEvent): void {
		localStorage.setItem('currentPage', JSON.stringify(event.page));
		this.currentPage = event.page;

		this.getHospitals(10, event.page);
	}
}
