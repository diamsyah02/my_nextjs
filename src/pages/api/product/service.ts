import { NextApiRequest } from "next";
import WebResponse from "@/Helpers/web_response";

export const getData = async (req: NextApiRequest) => {
    return WebResponse({ statusCode: 200, message: `Post data product success`, data: [] })
}

export const postData = async (req: NextApiRequest) => {
    return WebResponse({ statusCode: 200, message: `Post data product success`, data: [] })
}

export const putData = async (req: NextApiRequest) => {
    return WebResponse({ statusCode: 200, message: `Update data product success`, data: [] })
}

export const deleteData = async (req: NextApiRequest) => {
    return WebResponse({ statusCode: 200, message: `Post data product success`, data: [] })
}