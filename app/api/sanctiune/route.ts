import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const sanctiune = await prisma.sanctiune.create({
    data: {
      srlId: data.srlId,
      descriere: data.descriere,
      motiv: data.motiv,
      dataExpirare: new Date(data.dataExpirare),
      oferitDe: data.oferitDe,
    }
  });
  return Response.json(sanctiune);
}
