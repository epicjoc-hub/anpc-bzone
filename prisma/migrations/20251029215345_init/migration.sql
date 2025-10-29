-- CreateTable
CREATE TABLE "Persoana" (
    "id" TEXT NOT NULL,
    "nume" TEXT NOT NULL,
    "prenume" TEXT NOT NULL,
    "cnp" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,

    CONSTRAINT "Persoana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Srl" (
    "id" TEXT NOT NULL,
    "nume" TEXT NOT NULL,
    "locatie" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "proprietarId" TEXT NOT NULL,
    "coproprietarId" TEXT,
    "managerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Srl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aviz" (
    "id" TEXT NOT NULL,
    "srlId" TEXT NOT NULL,
    "dataExpirare" TIMESTAMP(3) NOT NULL,
    "oferitDe" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aviz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sanctiune" (
    "id" TEXT NOT NULL,
    "srlId" TEXT NOT NULL,
    "descriere" TEXT NOT NULL,
    "motiv" TEXT NOT NULL,
    "dataExpirare" TIMESTAMP(3) NOT NULL,
    "oferitDe" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sanctiune_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Srl" ADD CONSTRAINT "Srl_proprietarId_fkey" FOREIGN KEY ("proprietarId") REFERENCES "Persoana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Srl" ADD CONSTRAINT "Srl_coproprietarId_fkey" FOREIGN KEY ("coproprietarId") REFERENCES "Persoana"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Srl" ADD CONSTRAINT "Srl_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Persoana"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aviz" ADD CONSTRAINT "Aviz_srlId_fkey" FOREIGN KEY ("srlId") REFERENCES "Srl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sanctiune" ADD CONSTRAINT "Sanctiune_srlId_fkey" FOREIGN KEY ("srlId") REFERENCES "Srl"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
