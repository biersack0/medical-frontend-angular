import { Doctor } from './doctor.interface';
import { Hospital } from './hospital.interface';
import { User } from './user.interface';

export interface ResponseInterface {
	statusCode: number;
	message: string;
	data?: any;
	errors?: any[];
}

export interface LoginResponse extends ResponseInterface {
	data: {
		user: User;
		access_token: string;
	};
}

export interface UsersResponse extends ResponseInterface {
	data: {
		total: number;
		totalPages: number;
		page: number;
		users: User[];
	};
}

export interface UserResponse extends ResponseInterface {
	data: User;
}

export interface HospitalsResponse extends ResponseInterface {
	data: {
		total: number;
		totalPages: number;
		page: number;
		hospitals: Hospital[];
	};
}

export interface HospitalResponse extends ResponseInterface {
	data: Hospital;
}

export interface DoctorsResponse extends ResponseInterface {
	data: {
		total: number;
		totalPages: number;
		page: number;
		doctors: Doctor[];
	};
}

export interface SearchResponse extends ResponseInterface {
	data: {
		doctors: Doctor[];
		hospitals: Hospital[];
		users: User[];
	};
}

export interface UploadResponse extends ResponseInterface {
	data: User;
}
