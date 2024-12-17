import { ListDemoClient } from './list-demo.client';

export interface DummyUsersReponse {
	users: User[];
	total: number;
	skip: number;
	limit: number;
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

const getComments = async (): Promise<DummyUsersReponse> => {
	const response = await fetch('https://dummyjson.com/users');

	return response.json() as Promise<DummyUsersReponse>;
};

export const ListDemo = async () => {
	const data = await getComments();

	return <ListDemoClient data={data.users} />;
};
