import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const aviz = await prisma.aviz.create({
    data: {
      srlId: data.srlId,
      dataExpirare: new Date(data.dataExpirare),
      oferitDe: data.oferitDe,
    }
  });
  return Response.json(aviz);
}
