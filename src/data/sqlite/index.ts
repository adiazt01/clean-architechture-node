import { createClient } from "@libsql/client";
import { type LibSQLDatabase, drizzle } from "drizzle-orm/libsql";
import { envs } from "../../config";
import { CustomError } from "../../domain";

interface IDrizzleOrmOptions {
	url: string;
}

export type IDatabaseOrm = LibSQLDatabase<Record<string, unknown>>;

class DrizzleOrm {
	private static instance: DrizzleOrm;
	private client: ReturnType<typeof createClient>;
	private db: ReturnType<typeof drizzle>;

	private constructor(options: IDrizzleOrmOptions) {
		try {
			this.client = createClient({
				url: options.url,
			});
			this.db = drizzle({
				client: this.client,
			});
		} catch (error) {
			if (error instanceof CustomError) {
				throw CustomError.badDatabaseConnection(error.message);
			}

			throw CustomError.internalServerError();
		}
	}

	public static getInstance(options: IDrizzleOrmOptions): DrizzleOrm {
		if (!DrizzleOrm.instance) {
			DrizzleOrm.instance = new DrizzleOrm(options);
		}
		return DrizzleOrm.instance;
	}

	public getDb() {
		return this.db;
	}
}

const drizzleOrmInstance = DrizzleOrm.getInstance({
	url: envs.DATABASE_URL,
});

export default drizzleOrmInstance;
export const db = drizzleOrmInstance.getDb();
