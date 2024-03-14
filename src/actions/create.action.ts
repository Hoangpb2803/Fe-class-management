'use server'

import { Create } from "@/apis/create.api"
import { IResponse } from "@/types/response.interface"

export default async function createAction<T>(path: string, data: any): Promise<IResponse<T>> {
    const res = await Create(path, data)

    if (res.data) {
        return { status: true, data: res.data }
    }
    return { status: false, message: res?.message }
}