import { User } from './user.interface';

export interface Hospital {
	_id: string;
	name: string;
	user: User;
	image?: string;
}
