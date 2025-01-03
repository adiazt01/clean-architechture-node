import bcrypt from "bcrypt";

export class EncriptationService {
	async hash(
		password: string,
	): Promise<string> {
		const saltRounds = 10;
		return await bcrypt.hash(
			password,
			saltRounds,
		);
	}

	async compare(
		password: string,
		hash: string,
	): Promise<boolean> {
		return await bcrypt.compare(
			password,
			hash,
		);
	}
}
