import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl;

@Pipe({
	name: 'notImage',
})
export class NotImagePipe implements PipeTransform {
	transform(
		value: string | undefined,
		type: 'user' | 'hospital' | 'doctor'
	): string {
		if (value == null || (value == undefined && type === 'user')) {
			return `${baseUrl}/upload/${type}/default-user.png`;
		} else if (value == null || value == undefined) {
			return `${baseUrl}/upload/${type}/no-image.jpg`;
		} else if (value.includes('googleusercontent')) {
			return value;
		}

		return `${baseUrl}/upload/${type}/${value}`;
	}
}
