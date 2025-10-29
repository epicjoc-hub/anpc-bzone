import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const sanctiuni = await prisma.sanctiune.findMany({
    include: { srl: true }
  });
  return Response.json(sanctiuni);
}
