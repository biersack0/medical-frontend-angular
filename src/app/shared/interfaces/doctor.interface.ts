import { Hospital } from './hospital.interface';
import { User } from './user.interface';

export interface Doctor {
	_id: string;
	name: string;
	user: User;
	hospital: Hospital | null;
}
