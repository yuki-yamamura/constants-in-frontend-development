import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const client = new PrismaClient();
  const posts = await client.post.findMany();

  return NextResponse.json(posts);
}
