# Mercurio API — API profesional con JWT, roles y CRUD (en español)

Stack: TypeScript, Express, Prisma ORM, PostgreSQL, JWT, Zod, Helmet, Swagger.
Arquitectura modular (auth/usuarios/productos), con CI y Docker Compose.

## Uso rápido
```powershell
docker compose -f infra/docker-compose.yml up -d
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```
- API: http://localhost:4000
- Docs: http://localhost:4000/docs
