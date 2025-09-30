import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

const openapi = {
  openapi: '3.0.3',
  info: { title: 'Mercurio API', version: '0.1.0' },
  servers: [{ url: 'http://localhost:4000' }],
  paths: {
    '/salud': { get: { summary: 'Health' } },
    '/auth/registro': { post: { summary: 'Registro' } },
    '/auth/login': { post: { summary: 'Login' } },
    '/usuarios/yo': { get: { summary: 'Yo', security: [{ bearerAuth: [] }] } },
    '/productos': { get: { summary: 'Listar', security: [{ bearerAuth: [] }] }, post: { summary: 'Crear', security: [{ bearerAuth: [] }] } },
    '/productos/{id}': { put: { summary: 'Actualizar', security: [{ bearerAuth: [] }] }, delete: { summary: 'Eliminar', security: [{ bearerAuth: [] }] } }
  },
  components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } } }
}

export const swaggerRouter = () => {
  const r = Router()
  r.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi as any))
  return r
}
