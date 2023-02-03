import { SweetAlertService } from './../../../../shared/services/sweet-alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserModalComponent } from 'src/app/shared/components/modals/user-modal/user-modal.component';
import { Subscription } from 'rxjs';
import { SearchService } from '@services/search.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
	users: User[] = [];
	usersTemp: User[] = [];
	currentPage = 1;
	totalUsers = 0;
	bsModalRef?: BsModalRef;
	subscription!: Subscription;

	constructor(
		private userService: UserService,
		private searchService: SearchService,
		private modalService: BsModalService,
		private sweetAlertService: SweetAlertService
	) {}

	ngOnInit(): void {
		if (
			localStorage.getItem('currentPage') &&
			localStorage.getItem('totalUsers')
		) {
			this.currentPage = Number(localStorage.getItem('currentPage')!);
			this.totalUsers = Number(localStorage.getItem('totalUsers')!);
		}

		this.getUsers(10, this.currentPage);

		this.subscription = this.userService.refresh$.subscribe(() => {
			this.getUsers(10, this.currentPage);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		localStorage.removeItem('currentPage');
		localStorage.removeItem('totalUsers');
	}

	getUsers(limit = 10, page = 1) {
		this.userService.getUsers(limit, page).subscribe({
			next: ({ data }) => {
				this.users = data.users;
				this.usersTemp = data.users;
				this.totalUsers = data.total;
				localStorage.setItem('totalUsers', String(this.totalUsers));
			},
		});
	}

	search(value: string) {
		if (value == '') {
			this.users = this.usersTemp;
		}

		if (value.trim() !== '') {
			this.searchService.findByCollection('user', value).subscribe({
				next: ({ data }) => {
					this.users = data;
				},
			});
		}
	}

	addUser() {
		this.bsModalRef = this.modalService.show(UserModalComponent, {
			class: 'modal-dialog-centered',
		});
	}

	updateUser(user: User) {
		const initialState = {
			userToUpdate: user,
			isCreate: false,
		};

		this.bsModalRef = this.modalService.show(UserModalComponent, {
			initialState,
			class: 'modal-dialog-centered',
		});
	}

	deleteUser(id: string) {
		if (this.userService.user$.getValue()._id === id) {
			this.sweetAlertService.simpleAlert(
				'warning',
				'Alerta',
				'No se puede eliminar a si mismo.'
			);
			return;
		}

		this.userService.deleteUser(id).subscribe({
			next: () =>
				this.sweetAlertService.successAlert(
					false,
					'Usuario eliminado',
					'El usuario fue eliminado.'
				),
		});
	}

	getUsersByPage(event: PageChangedEvent): void {
		localStorage.setItem('currentPage', JSON.stringify(event.page));
		this.currentPage = event.page;

		this.getUsers(10, event.page);
	}
}
