'use server'

import { Update } from "@/apis/update.api"
interface IResponse {
    status: boolean,
    message?: string[] | string
}

export default async function updateAction(path: string, _id: string | null, data: any): Promise<IResponse> {
    if (_id) {
        const res = await Update(path, _id, data)

        if (res.data) {
            return { status: true }
        }
        return { status: false, message: res?.message }
    }
    else {
        return { status: false, message: "Cannot find student!" }
    }
}