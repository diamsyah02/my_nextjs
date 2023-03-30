import { NextApiRequest, NextApiResponse } from "next";
import { WebResponseEntity } from "@/Entities/WebResponse";
import { getData, postData, putData, deleteData } from "./service";
import { verifyAuthenticationX } from "@/Helpers/authentication";

let result: WebResponseEntity = {
    statusCode: 401,
    message: `Token Invalid!`,
    data: []
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (verifyAuthenticationX(req)) {
        const { method } = req
        if (method == 'GET') result = await getData(req)
        if (method == 'POST') result = await postData(req)
        if (method == 'PUT') result = await putData(req)
        if (method == 'DELETE') result = await deleteData(req)
        return await res.status(result.statusCode).send(result)
    }
    return res.status(result.statusCode).send(result)
}








