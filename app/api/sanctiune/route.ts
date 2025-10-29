import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";

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
