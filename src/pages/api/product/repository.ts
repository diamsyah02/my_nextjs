import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let result: any;

export const repo_get = async (username: string) => {
    try {
        result = await prisma.products.findMany()
    } catch (e) {
        result = e;
    }
    return result;
};

export const repo_post = (name: string, qty: number) => {
    try {
        result = prisma.products.create({
            data: {
                name: name,
                qty: qty,
            },
        });
    } catch (e) {
        result = e;
    }
    return result;
};

export const repo_delete = async () => {
    try {
        
    } catch(e) {
        result = e
    }
}
