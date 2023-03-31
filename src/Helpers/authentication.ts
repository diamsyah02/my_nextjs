import { serialize } from "cookie"
import { NextApiRequest, NextApiResponse } from "next";
import { sign, verify } from 'jsonwebtoken'
import { KEY_COOKIE } from "./constant";

export const setCookieX = (res: NextApiResponse, token: string) => {
    const serialised = serialize(KEY_COOKIE, token, {
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
    return cookies[KEY_COOKIE]
}

export const clearCookieX = (res: NextApiResponse) => {
    const serialised = serialize(KEY_COOKIE, '', {
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
        process.env.NEXTAUTH_SECRET || 'IMHJLgUO6yK0Nsi+7Iq3b5SGxtd0snIl9XplnZ6LLmk=',
        {
            algorithm: 'HS256'
        }
    );
    return token
}

export const verifyAuthenticationX = (req: NextApiRequest) => {
    const { headers } = req
    let jwt = headers.authorization?.split(' ')
    if (jwt?.length! > 0) {
        const decode = verify(jwt[1], process.env.NEXTAUTH_SECRET || 'IMHJLgUO6yK0Nsi+7Iq3b5SGxtd0snIl9XplnZ6LLmk=')
        if (Object.keys(decode).length !== 0) return true
        return false
    }
    return false
}