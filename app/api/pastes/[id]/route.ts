export const runtime = "nodejs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const paste = await prisma.paste.findUnique({
    where: { id: params.id }
  });

  if (!paste) return new Response(null, { status: 404 });

  if (paste.expiresAt && new Date() > paste.expiresAt)
    return new Response(null, { status: 404 });

  if (paste.remainingViews !== null && paste.remainingViews <= 0)
    return new Response(null, { status: 404 });

  if (paste.remainingViews !== null) {
    await prisma.paste.update({
      where: { id: params.id },
      data: { remainingViews: paste.remainingViews - 1 }
    });
  }

  return new Response(JSON.stringify(paste), { status: 200 });
}
