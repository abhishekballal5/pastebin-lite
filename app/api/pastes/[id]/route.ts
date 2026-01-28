import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const paste = await prisma.paste.findUnique({
    where: { id }
  });

  if (!paste) return new Response(null, { status: 404 });

  if (paste.expiresAt && new Date() > paste.expiresAt)
    return new Response(null, { status: 404 });

  if (paste.remainingViews !== null && paste.remainingViews <= 0)
    return new Response(null, { status: 404 });

  if (paste.remainingViews !== null) {
    await prisma.paste.update({
      where: { id },
      data: { remainingViews: paste.remainingViews - 1 }
    });
  }

  return Response.json(paste);
}
