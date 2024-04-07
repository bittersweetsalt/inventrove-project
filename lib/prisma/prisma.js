import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export const PrismaContext = React.createContext(prisma);
export default prisma;