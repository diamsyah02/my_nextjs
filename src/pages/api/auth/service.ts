import { NextApiRequest } from "next"
import WebResponse from "@/Helpers/web_response"
import { repo_login, repo_register } from "./repository"
import { setTokenX } from "@/Helpers/authentication";
import md5 from 'md5'

export const login = async (req: NextApiRequest) => {
    const { body } = req
    const result = await repo_login(body.username)
    if (typeof result === 'object' && Object.keys(result).length !== 0) {
        if(result.password !== md5(body.password)) return WebResponse({ statusCode: 400, message: `Login unsuccessfully because password is wrong!`, data: [] })
        const token = setTokenX(body.username)
        return WebResponse({ statusCode: 200, message: `Login successfully`, data: token })
    }
    return WebResponse({ statusCode: 400, message: `Login unsuccessfully because user not found!`, data: [] })
}

export const register = async (req: NextApiRequest) => {
    const { body } = req
    const result = await repo_register(body.username, md5(body.password))
    if (typeof result === 'object' && Object.keys(result).length !== 0) {
        return WebResponse({ statusCode: 200, message: `Register successfully`, data: { username: result.username } })
    }
    return WebResponse({ statusCode: 400, message: `Register unsuccessfully`, data: [] })
}