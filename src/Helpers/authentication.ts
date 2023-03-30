import { serialize } from "cookie"
import { NextApiRequest, NextApiResponse } from "next";
import { sign, verify } from 'jsonwebtoken'
import { decryptX, encryptX } from "@/Helpers/encrypt_decrypt";

export const setCookieX = (res: NextApiResponse, token: string) => {
    const serialised = serialize(encryptX(process.env.KEY_COOKIE || 'nextjs_asyncawait'), token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
    });
    res.setHeader("Set-Cookie", serialised)
}

export const getCookieX = (req: NextApiRequest) => {
    const { cookies } = req
    return cookies[decryptX(process.env.KEY_COOKIE || 'nextjs_asyncawait')]
}

export const clearCookieX = (res: NextApiResponse) => {
    const serialised = serialize(process.env.KEY_COOKIE || 'nextjs_asyncawait', '', {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: -1,
        path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
}

export const setTokenX = (username: string) => {
    const token = sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
            username: username,
        },
        process.env.NEXTAUTH_SECRET || '',
        {
            algorithm: 'RS512'
        }
    );
    return token
}

export const verifyAuthenticationX = (req: NextApiRequest) => {
    const { cookies } = req
    const jwt = cookies[decryptX(process.env.KEY_COOKIE || 'nextjs_asyncawait')]
    if (jwt) {
        const decode = verify(jwt, process.env.NEXTAUTH_SECRET || 'IMHJLgUO6yK0Nsi+7Iq3b5SGxtd0snIl9XplnZ6LLmk=')
        if (decode) return true
        return false
    }
    return false
}