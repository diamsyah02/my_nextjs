import { decryptX, encryptX } from "@/Helpers/encrypt_decrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { login, register } from "./service";
import { WebResponseEntity } from "@/Entities/WebResponse";
import { clearCookieX, getCookieX, setCookieX } from "@/Helpers/authentication";

let result: WebResponseEntity;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if(decryptX(query.__) === 'login') {
        result = await login(req)
        setCookieX(res, result.data)
    }
    if(decryptX(query.__) === 'register') result = await register(req)
    if(decryptX(query.__) === 'logout') {
        if (!getCookieX(req)) result = { statusCode: 401, message: `You are already not login`, data: [] }
        clearCookieX(res)
        result = {statusCode: 200, message: `Successfuly logout!`, data: []}
    }
    return res.status(result.statusCode).send(result)
}