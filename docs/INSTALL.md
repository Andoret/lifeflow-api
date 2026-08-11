# Instalación

## Requisitos

- Node.js 20+
- Una base de datos PostgreSQL (por ejemplo, un proyecto gratuito de [Supabase](https://supabase.com))

## Variables de entorno (`.env`)

| Variable | Para qué sirve |
|---|---|
| `DATABASE_URL_POOLING` | Conexión a Postgres usada en runtime (con pgbouncer si aplica) |
| `DIRECT_URL` | Conexión directa a Postgres, usada solo por Prisma para migraciones |
| `JWT_SECRET` | Clave para firmar/verificar los tokens de acceso y refresco |
| `FRONTEND_URL` | Origen permitido por CORS (la URL del frontend) |
| `PORT` | Puerto donde escucha la API (por defecto 3000) |

## Pasos

```bash
npm install

# Aplica todas las migraciones a tu base de datos
npx prisma migrate deploy   # o `npx prisma migrate dev` en desarrollo

npm run start:dev
```

La API queda escuchando en `http://localhost:3000` (o el `PORT` que definas).

### Notas

- Si la base de datos está pausada (por ejemplo, un proyecto Supabase free tier inactivo), Nest arrancará y mapeará las rutas, pero cualquier llamada que toque la base fallará hasta que la reactives.
- Para inspeccionar los datos visualmente: `npx prisma studio`.
