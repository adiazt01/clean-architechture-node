export class UserEntity {
	constructor(
		public id: number | string,
		public name: string,
		public email: string,
		public role: string[],
	) {}
}
