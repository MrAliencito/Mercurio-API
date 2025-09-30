import jwt from 'jsonwebtoken'
const secret = process.env.JWT_SECRET || 'supersecreto'
export const sign = (p: any) => jwt.sign(p, secret, { expiresIn: '7d' })
export const verify = (t: string) => jwt.verify(t, secret) as any
