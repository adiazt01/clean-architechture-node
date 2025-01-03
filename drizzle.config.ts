import { defineConfig } from 'drizzle-kit';
import { envs } from './src/config';

export default defineConfig({
  out: './drizzle',
  schema: [
    './src/data/sqlite/models/user.schema.ts',
  ],
  dialect: 'sqlite',
  dbCredentials: {
    url: envs.DATABASE_URL,
  },
});
