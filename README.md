## Inventory Management
This project is developed using Next.js, Material UI, PostgreSQL, Prisma ORM, and Minio S3 Storage.

## Docker Image needed:
- Minio:       `docker pull minio/minio`
- PostgreSQL:  `docker pull postgres`

## Setting up Prisma
- `npm install prisma`
- `npx prisma init`
- configure the schema which maps directly to the Database Scheme setup
- `npx prisma generate`

## How to run locally
Once the docker images are up and running - Inside your IDE of choice:
- `npm install`
- `npm update` (If needed)
- `npm run dev`