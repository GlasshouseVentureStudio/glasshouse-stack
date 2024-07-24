export enum DummyEndpoint {
	Comments = '/comments',
}

export interface BaseDummyParam {
	limit: number;
	skip: number;
	sortBy?: string;
	order?: 'asc' | 'desc';
}

export type GetDummyCommentsParams = BaseDummyParam & {
	sortBy?: keyof Comment;
};

export interface DummyCommentsResponse {
	comments: Comment[];
	total: number;
	skip: number;
	limit: number;
}

export interface Comment {
	id: number;
	body: string;
	postId: number;
	likes: number;
	user: CommentUser;
}

export interface CommentUser {
	id: number;
	username: string;
	fullName: string;
}

export interface DummyUsersReponse {
	users: User[];
	total: number;
	skip: number;
	limit: number;
}

export interface GetDummyUsersParams extends BaseDummyParam {
	sortBy?: keyof User;
}

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	maidenName: string;
	age: number;
	gender: string;
	email: string;
	phone: string;
	username: string;
	password: string;
	birthDate: string;
	image: string;
	bloodGroup: string;
	height: number;
	weight: number;
	eyeColor: string;
	hair: Hair;
	ip: string;
	address: Address;
	macAddress: string;
	university: string;
	bank: Bank;
	company: Company;
	ein: string;
	ssn: string;
	userAgent: string;
	crypto: Crypto;
	role: string;
}

export interface Crypto {
	coin: string;
	wallet: string;
	network: string;
}

export interface Company {
	department: string;
	name: string;
	title: string;
	address: Address;
}

export interface Bank {
	cardExpire: string;
	cardNumber: string;
	cardType: string;
	currency: string;
	iban: string;
}

export interface Address {
	address: string;
	city: string;
	state: string;
	stateCode: string;
	postalCode: string;
	coordinates: Coordinates;
	country: string;
}

export interface Coordinates {
	lat: number;
	lng: number;
}

export interface Hair {
	color: string;
	type: string;
}
