# LifeFlow API

Backend de LifeFlow ("Mewa"), una app personal de productividad: ejercicio, cocina, gastos y agenda/tareas, todo detrás de un solo login.

## Stack

- [NestJS](https://nestjs.com/) 11 + TypeScript
- [Prisma](https://www.prisma.io/) 5 sobre PostgreSQL
- Autenticación con JWT (access + refresh token)

## Módulos

| Módulo | Qué hace |
|---|---|
| `authentication` | Login, refresh token, guard global |
| `users` | Registro, perfil (`/users/me`), cambio de contraseña |
| `excercise-categories` / `excercise-users` | Categorías de ejercicio y plan semanal por día |
| `schedule-activities` | Agenda/calendario de actividades (base del panel de tareas) |
| `categories-expenses` / `expenses` | Categorías de gasto y gastos, con estadísticas |
| `kitchen` | Sugerencia de platillo a partir de ingredientes (espacio preparado para IA) |

Ver [docs/HOW_IT_WORKS.md](docs/HOW_IT_WORKS.md) para la arquitectura y [docs/INSTALL.md](docs/INSTALL.md) para levantar el proyecto localmente.

## Scripts

```bash
npm run start:dev   # desarrollo con recarga
npm run build       # compila a dist/
npm run test        # tests unitarios (Jest)
```
