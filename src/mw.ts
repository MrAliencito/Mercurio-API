import { Request, Response, NextFunction } from 'express'
import { verify } from './jwt'

export function bearer(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const h = req.headers['authorization'] || ''
  const raw = (Array.isArray(h) ? h[0] : h).replace(/^Bearer\s+/i, '')
  if (!raw) return res.status(401).json({ error: 'Falta token' })
  try { req.user = verify(raw); next() } catch { return res.status(401).json({ error: 'Token inválido' }) }
}
