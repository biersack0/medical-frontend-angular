import { Injectable } from '@angular/core';

interface DefaultTheme {
	'data-theme': string;
	'data-topbar-color': string;
	'data-menu-color': string;
}

@Injectable({
	providedIn: 'root',
})
export class SettingsService {
	private rootHTML = document.documentElement;
	private defaultTheme: DefaultTheme = {
		'data-theme': 'light',
		'data-topbar-color': 'light',
		'data-menu-color': 'dark',
	};
	constructor() {
		if (localStorage.getItem('defaultTheme')) {
			this.defaultTheme = JSON.parse(localStorage.getItem('defaultTheme')!);

			this.rootHTML.setAttribute('data-theme', this.defaultTheme['data-theme']);
			this.rootHTML.setAttribute(
				'data-topbar-color',
				this.defaultTheme['data-topbar-color']
			);
			this.rootHTML.setAttribute(
				'data-menu-color',
				this.defaultTheme['data-menu-color']
			);
		}
	}

	changePropertyTheme(property: string, value: string) {
		if (property === 'data-theme' && value === '') {
			value = this.defaultTheme['data-theme'] === 'light' ? 'dark' : 'light';
		}

		this.defaultTheme[property as keyof DefaultTheme] = value;
		this.rootHTML.setAttribute(property, value);
		localStorage.setItem('defaultTheme', JSON.stringify(this.defaultTheme));
	}

	resetTheme() {
		this.rootHTML.setAttribute('data-theme', 'light');
		this.rootHTML.setAttribute('data-topbar-color', 'light');
		this.rootHTML.setAttribute('data-menu-color', 'dark');
	}

	closeOpenSidebar() {
		const sidebarProperty =
			this.rootHTML.getAttribute('data-sidenav-size') || 'default';

		let setProperty = '';

		sidebarProperty === 'default'
			? (setProperty = 'condensed')
			: (setProperty = 'default');

		this.rootHTML.setAttribute('data-sidenav-size', setProperty);
	}
}
