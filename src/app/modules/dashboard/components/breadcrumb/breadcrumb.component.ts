import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styles: [],
})
export class BreadcrumbComponent implements OnDestroy {
	title = '';

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {
		this.getTitleFromRoute();
	}

	ngOnDestroy(): void {
		this.getTitleFromRoute().unsubscribe();
	}

	getTitleFromRoute() {
		return this.router.events
			.pipe(
				filter((event: any) => event instanceof ActivationEnd),
				filter((event: ActivationEnd) => event.snapshot.firstChild == null),
				map((event: ActivationEnd) => event.snapshot.data)
			)
			.subscribe(({ title }) => {
				this.title = title;
				document.title = title;
			});
	}
}
