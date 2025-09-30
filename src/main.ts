import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import { prisma } from './prisma'
import auth from './auth'
import users from './users'
import products from './products'
import { swaggerRouter } from './swagger'
const PORT = Number(process.env.PORT) || 4000

const app = express()
app.use(express.json())
app.use(helmet())

app.get('/salud', async (_req, res) => {
  try { await prisma.$queryRaw`SELECT 1`; res.json({ ok: true }) }
  catch (e) { res.status(500).json({ ok: false, error: String(e) }) }
})

app.use('/auth', auth)
app.use('/usuarios', users)
app.use('/productos', products)
app.use(swaggerRouter())

app.listen(PORT, () => {
  console.log(`Mercurio API en http://localhost:${PORT}`)
  console.log(`Swagger en http://localhost:${PORT}/docs`)
})
