import { NextApiRequest } from "next"
import WebResponse from "@/Helpers/web_response"
import { repo_login, repo_register } from "./repository"
import { setTokenX } from "@/Helpers/authentication";

export const login = (req: NextApiRequest) => {
    const { body } = req
    const result = repo_login(body.username)
    if (typeof result === 'object' && Object.keys(result).length !== 0) {
        const token = setTokenX(body.username)
        return WebResponse({ statusCode: 200, message: `Login successfully`, data: token })
    }
    return WebResponse({ statusCode: 400, message: `Login unsuccessfully`, data: [] })
}

export const register = (req: NextApiRequest) => {
    const { body } = req
    const result = repo_register(body.username, body.password)
    if (typeof result === 'object' && Object.keys(result).length !== 0) {
        return WebResponse({ statusCode: 200, message: `Login successfully`, data: { username: result.username } })
    }
    return WebResponse({ statusCode: 400, message: `Register unsuccessfully`, data: [] })
}