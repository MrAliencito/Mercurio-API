import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { sign } from './jwt'
const r = Router()

r.post('/registro', async (req, res) => {
  const { email, nombre, password } = req.body || {}
  if (!email || !nombre || !password) return res.status(400).json({ error: 'email, nombre, password requeridos' })
  const exist = await prisma.user.findUnique({ where: { email } })
  if (exist) return res.status(409).json({ error: 'Email ya registrado' })
  const hash = await bcrypt.hash(password, 10)
  const u = await prisma.user.create({ data: { email, nombre, password: hash } })
  res.status(201).json({ token: sign({ sub: u.id, email: u.email, role: u.role }) })
})

r.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  const u = await prisma.user.findUnique({ where: { email } })
  if (!u) return res.status(401).json({ error: 'Credenciales inválidas' })
  const ok = await bcrypt.compare(password, u.password)
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' })
  res.json({ token: sign({ sub: u.id, email: u.email, role: u.role }) })
})

export default r
