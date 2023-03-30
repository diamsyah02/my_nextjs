import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let result: any;

export const repo_login = async (username: string) => {
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

export const repo_register = async (username: string, password: string) => {
    try {
        result = await prisma.users.create({
            data: {
                username: username,
                password: password,
            },
        });
        console.log(result)
    } catch (e) {
        result = e;
        console.log(e)
    }
    return result;
};
