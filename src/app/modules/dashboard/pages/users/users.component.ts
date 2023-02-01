import { Component, OnInit } from '@angular/core';
import { User } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styles: [],
})
export class UsersComponent implements OnInit {
	users: User[] = [];
	constructor(private userService: UserService) {}
	ngOnInit(): void {
		this.getUsers();
	}

	getUsers() {
		this.userService.getUsers().subscribe({
			next: ({ data }) => (this.users = data.users),
		});
	}

	addUser() {
		Swal.fire({
			title: 'Error',
			text: '',
			icon: 'error',
			confirmButtonText: 'Close',
		});
	}

	deleteUser(id: string) {
		console.log(id);
		Swal.fire({
			title: 'Error',
			text: `${id}`,
			icon: 'error',
			confirmButtonText: 'Close',
		});
	}
}
