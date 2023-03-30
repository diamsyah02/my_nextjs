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
        if (method == 'get') result = await getData(req)
        if (method == 'post') result = await postData(req)
        if (method == 'put') result = await putData(req)
        if (method == 'delete') result = await deleteData(req)
        return res.status(result.statusCode).send(result)
    }
    return res.status(result.statusCode).send(result)
}








