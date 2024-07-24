import {
	type DummyCommentsResponse,
	type DummyUsersReponse,
	type GetDummyCommentsParams,
	type GetDummyUsersParams,
} from './types';

export const API_URL = 'https://dummyjson.com';

export const getDummyComments = async (params?: GetDummyCommentsParams): Promise<DummyCommentsResponse> => {
	const urlSearchParams = params
		? new URLSearchParams(params as unknown as Record<string, string>)
		: new URLSearchParams();
	const response = await fetch(`${API_URL}/comments?${urlSearchParams.toString()}`);

	return response.json() as Promise<DummyCommentsResponse>;
};

export const getDummyUsers = async (params?: GetDummyUsersParams): Promise<DummyUsersReponse> => {
	const urlSearchParams = params
		? new URLSearchParams(params as unknown as Record<string, string>)
		: new URLSearchParams();
	const response = await fetch(`${API_URL}/users?${urlSearchParams.toString()}`);

	return response.json() as Promise<DummyUsersReponse>;
};
