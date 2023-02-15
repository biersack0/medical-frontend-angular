import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
	selector: 'app-not-found',
	standalone: true,
	templateUrl: './not-found.component.html',
	styles: [],
})
export class NotFoundComponent {
	year = new Date().getFullYear();
	constructor(private _location: Location) {}

	backClicked() {
		this._location.back();
	}
}
