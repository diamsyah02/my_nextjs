import { NextApiRequest } from "next";
import WebResponse from "@/Helpers/web_response";
import { repo_delete, repo_get, repo_post, repo_update } from "./repository";

export const getData = async (req: NextApiRequest) => {
    const result = await repo_get()
    return WebResponse({ statusCode: 200, message: `Get data product success`, data: result })
}

export const postData = async (req: NextApiRequest) => {
    const { body } = req
    const result = await repo_post(body)
    if(typeof result === 'object' && Object.keys(result).length !== 0) return WebResponse({ statusCode: 200, message: `Post data product success`, data: [] })
    return WebResponse({ statusCode: 400, message: `Post data product failed`, data: [] })
}

export const putData = async (req: NextApiRequest) => {
    const { query, body } = req
    const result = await repo_update(query.id, body)
    if(typeof result === 'object' && Object.keys(result).length !== 0) return WebResponse({ statusCode: 200, message: `Update data product success`, data: [] })
    return WebResponse({ statusCode: 400, message: `Update data product failed`, data: [] })
}

export const deleteData = async (req: NextApiRequest) => {
    const { query } = req
    const result = await repo_delete(query.id)
    if(result) return WebResponse({ statusCode: 200, message: `Delete data product success`, data: [] })
    return WebResponse({ statusCode: 400, message: `Delete data product failed`, data: [] })
}