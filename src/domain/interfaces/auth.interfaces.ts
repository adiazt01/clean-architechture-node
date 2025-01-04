export interface UserToken {
	token: string;
	user: {
		id: number | string;
		name: string;
		email: string;
	};
}