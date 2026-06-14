import PrismaClientPkg from '@prisma/client';

const { PrismaClient } = PrismaClientPkg;
const prisma = new PrismaClient({
    log: ["warn", "error"],
});
const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to the database via Prisma.");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); 
    }
};
const disconnectFromDatabase = async () => {
    await prisma.$disconnect();
};
export {prisma, connectToDatabase, disconnectFromDatabase};