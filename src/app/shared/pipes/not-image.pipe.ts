import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'notImage',
})
export class NotImagePipe implements PipeTransform {
	transform(value: string | undefined, ...args: unknown[]): string {
		if (value == null || value == undefined) {
			return 'assets/img/default-user.png';
		}

		return value;
	}
}
