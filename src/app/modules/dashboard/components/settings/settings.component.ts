import { Component } from '@angular/core';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styles: [],
})
export class SettingsComponent {
	constructor(private settingsService: SettingsService) {}

	changePropertyTheme(event: Event) {
		const input = event.target as HTMLInputElement;
		const property = input.getAttribute('name') || '';

		this.settingsService.changePropertyTheme(property, input.value);
	}

	resetTheme() {
		this.settingsService.resetTheme();
	}
}
