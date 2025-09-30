import { Router } from 'express'
import { prisma } from './prisma'
import { bearer } from './mw'
const r = Router()

r.get('/yo', bearer, async (req: any, res) => {
  const me = await prisma.user.findUnique({ where: { id: req.user.sub }, select: { id: true, email: true, nombre: true, role: true, createdAt: true } })
  res.json(me)
})

export default r
