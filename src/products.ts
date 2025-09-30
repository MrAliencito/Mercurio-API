import { Router } from 'express'
import { prisma } from './prisma'
import { bearer } from './mw'
const r = Router()

r.get('/', bearer, async (req, res) => {
  const page = Math.max(1, Number((req.query as any).page) || 1)
  const limit = Math.min(100, Math.max(1, Number((req.query as any).limit) || 10))
  const skip = (page - 1) * limit
  const q = (req.query as any).q ? String((req.query as any).q) : null
  const where = q ? { nombre: { contains: q, mode: 'insensitive' } } : {}
  const [items, total] = await Promise.all([
    prisma.product.findMany({ where, take: limit, skip, orderBy: { createdAt: 'desc' } }),
    prisma.product.count({ where })
  ])
  res.json({ items, total, page, limit })
})

r.post('/', bearer, async (req: any, res) => {
  const { nombre, precio, descripcion } = req.body || {}
  if (!nombre || precio == null) return res.status(400).json({ error: 'nombre y precio requeridos' })
  const p = await prisma.product.create({ data: { nombre, precio: Number(precio), descripcion, ownerId: req.user.sub } })
  res.status(201).json(p)
})

r.put('/:id', bearer, async (req: any, res) => {
  const id = Number(req.params.id)
  const prod = await prisma.product.findUnique({ where: { id } })
  if (!prod) return res.status(404).json({ error: 'No encontrado' })
  const esDueno = prod.ownerId === req.user.sub
  const esAdmin = req.user.role === 'ADMIN'
  if (!esDueno && !esAdmin) return res.status(403).json({ error: 'No autorizado' })
  const data: any = {}
  if (req.body.nombre) data.nombre = req.body.nombre
  if (req.body.precio != null) data.precio = Number(req.body.precio)
  if (req.body.descripcion !== undefined) data.descripcion = req.body.descripcion
  const upd = await prisma.product.update({ where: { id }, data })
  res.json(upd)
})

r.delete('/:id', bearer, async (req: any, res) => {
  const id = Number(req.params.id)
  const prod = await prisma.product.findUnique({ where: { id } })
  if (!prod) return res.status(404).json({ error: 'No encontrado' })
  const esDueno = prod.ownerId === req.user.sub
  const esAdmin = req.user.role === 'ADMIN'
  if (!esDueno && !esAdmin) return res.status(403).json({ error: 'No autorizado' })
  await prisma.product.delete({ where: { id } })
  res.status(204).send()
})

export default r
