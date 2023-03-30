import { WebResponseEntity } from "@/Entities/WebResponse";

export default function WebResponse(param: WebResponseEntity) {
    return {
        statusCode: param.statusCode,
        message: param.message,
        data: param.data
    }
}