import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export const getDb = (locals: any) => {
  const { env } = locals.runtime;
  return drizzle(env.DB, { schema });
};

export const getDbAsync = async (locals: any) => {
  const { env } = locals.runtime;
  return drizzle(env.DB, { schema });
};
