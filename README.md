# ANPC Panel

Panel modern pentru gestionare SRL-uri, avize și sancțiuni (bzone/discord integration).
- Design minimalist, alb + auriu
- Next.js 14 + TailwindCSS + Prisma
- Ready to deploy pe Vercel

## Setup rapid

1. `yarn` sau `npm install`
2. Copiază `.env.example` ca `.env.local` și setează variabilele (WebHook Discord, etc)
3. `npx prisma db push`
4. `yarn dev` sau `npm run dev`
5. Deploy pe Vercel (autodetect Next.js)

## Customize

- Listele statice: `/data/users.ts`, `/data/tipSrl.ts`, `/data/locatii.ts`
- Prisma schema: `/prisma/schema.prisma`
- Webhook Discord: `/utils/discord.ts`
anpc-bzone
