import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const srls = await prisma.srl.findMany({
    include: {
      proprietar: true,
      coproprietar: true,
      manager: true,
      avize: true,
      sanctiuni: true,
    },
  });
  return Response.json(srls);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const proprietar = await prisma.persoana.create({ data: data.proprietar || {} });
  const coproprietar = data.coproprietar ? await prisma.persoana.create({ data: data.coproprietar }) : null;
  const manager = data.manager ? await prisma.persoana.create({ data: data.manager }) : null;

  const srl = await prisma.srl.create({
    data: {
      nume: data.nume,
      tip: data.tip,
      locatie: data.locatie,
      proprietarId: proprietar.id,
      coproprietarId: coproprietar?.id,
      managerId: manager?.id,
    },
    include: { proprietar: true, coproprietar: true, manager: true, avize: true, sanctiuni: true },
  });
  return Response.json(srl);
}
