import { Component, OnInit } from '@angular/core';
import { User } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';

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
}
