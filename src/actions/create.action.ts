'use server'

import { Create } from "@/apis/create.api"
interface IResponse {
    status: boolean,
    message?: string[] | string
}

export default async function createAction(path: string, data: any): Promise<IResponse> {
    const res = await Create(path, data)

    if (res.data) {
        return { status: true }
    }
    return { status: false, message: res?.message }
}