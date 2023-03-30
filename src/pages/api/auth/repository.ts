import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const repo_login = async (username: string) => {
    let result: any;
    try {
        result = await prisma.users.findUnique({
            where: {
                username: username,
            },
        });
    } catch (e) {
        result = e;
    }
    return result;
};

export const repo_register = (username: string, password: string) => {
    let result: any;
    try {
        result = prisma.users.create({
            data: {
                username: username,
                password: password,
            },
        });
    } catch (e) {
        result = e;
    }
    return result;
};
