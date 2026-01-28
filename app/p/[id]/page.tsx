import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) {
    return <h1>404 Not Found</h1>;
  }

  if (paste.expiresAt && new Date() > paste.expiresAt) {
    return <h1>Paste Expired</h1>;
  }

  return (
    <main style={{ padding: 40 }}>
      <h2>Paste ID: {id}</h2>
      <pre>{paste.content}</pre>
    </main>
  );
}
