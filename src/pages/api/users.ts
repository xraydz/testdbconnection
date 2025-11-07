import { APIRoute } from "astro";
import { getDb } from "../../db/getDb";
import { usersTable } from "../../db/schema";

type UserInput = {
  name: string;
  age: number;
  email: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = getDb(locals);
  const { name, age, email }: UserInput = await request.json();
  try {
    const newUser = await db.insert(usersTable).values({ name, age, email }).returning();
    return Response.json(newUser[0], { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }
};

export const GET: APIRoute = async ({ locals }) => {
  const db = getDb(locals);
  try {
    const users = await db.select().from(usersTable);
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
};
