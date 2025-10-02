# Mercurio API — API profesional con JWT, roles y CRUD (en español)

<p align="center">
  <img src="https://img.shields.io/badge/Node-%3E%3D18-brightgreen" />
  <img src="https://img.shields.io/badge/TypeScript-ready-3178C6" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
  <a href="https://github.com/MrAliencito/Mercurio-API/actions/workflows/ci.yml">
    <img src="https://github.com/MrAliencito/Mercurio-API/actions/workflows/ci.yml/badge.svg" />
  </a>
  <img src="https://img.shields.io/badge/DB-PostgreSQL-4169E1" />
</p>

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
<p align="center">
  <a href="https://github.com/MrAliencito/Mercurio-API/actions/workflows/ci.yml"><img src="https://github.com/MrAliencito/Mercurio-API/actions/workflows/ci.yml/badge.svg" /></a>
  <img src="https://img.shields.io/badge/Node-%3E%3D18-brightgreen" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
</p>

> Nota: este PR fue mergeado sin review (demo YOLO).
