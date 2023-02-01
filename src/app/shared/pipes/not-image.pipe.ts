import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl;

@Pipe({
	name: 'notImage',
})
export class NotImagePipe implements PipeTransform {
	transform(value: string | undefined, ...args: unknown[]): string {
		if (value == null || value == undefined) {
			return `${baseUrl}/upload/user/default-user.png`;
		}

		if (value.includes('googleusercontent')) {
			return value;
		}

		return `${baseUrl}/upload/user/${value}`;
	}
}
