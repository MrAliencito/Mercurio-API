import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { PrismaClient, Role } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@demo.com'
  const pass  = process.env.ADMIN_PASS  || 'admin123'
  const hash = await bcrypt.hash(pass, 10)
  const admin = await prisma.user.upsert({
    where: { email }, update: {}, create: { email, nombre: 'Admin', password: hash, role: Role.ADMIN }
  })
  await prisma.product.createMany({ data: [
    { nombre: 'Camiseta', precio: 19.99, descripcion: 'Talla M', ownerId: admin.id },
    { nombre: 'Gorra', precio: 9.50, descripcion: 'Negra', ownerId: admin.id }
  ]})
  console.log('Admin listo:', admin.email)
}
main().catch(e => { console.error(e); process.exit(1) }).finally(async () => prisma.$disconnect())
