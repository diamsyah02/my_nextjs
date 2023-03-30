import { ProductEntity } from "@/Entities/Product";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let result: any;

export const repo_get = async () => {
    try {
        result = await prisma.products.findMany()
    } catch (e) {
        result = e;
    }
    return result;
};

export const repo_post = (body: ProductEntity) => {
    try {
        result = prisma.products.create({
            data: {
                name: body.name,
                qty: body.qty,
            },
        });
    } catch (e) {
        result = e;
    }
    return result;
};

export const repo_update = (id: number, body: ProductEntity) => {
    try {
        result = prisma.products.update({
            data: {
                name: body.name,
                qty: body.qty
            },
            where: {
                id: id
            }
        })
    } catch(e) {
        result = e
    }
    return result
}

export const repo_delete = async (id: number) => {
    try {
        result = prisma.products.delete({ where: { id: id } })
    } catch(e) {
        result = e
    }
    return result
}
