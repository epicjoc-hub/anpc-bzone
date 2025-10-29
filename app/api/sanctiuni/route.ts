import { prisma } from "../../../lib/prisma";

export async function GET() {
  const sanctiuni = await prisma.sanctiune.findMany({
    include: { srl: true }
  });
  return Response.json(sanctiuni);
}
