'use server'

import { Update } from "@/apis/update.api"
import { IResponse } from "@/types/response.interface"
import { revalidateTag } from "next/cache"

export default async function updateAction<T>(path: string, _id: string | null, data: any): Promise<IResponse<T>> {
    if (_id) {
        const res = await Update(path, _id, data)

        if (res.data) {
            revalidateTag('student')
            return { status: true, data: res.data }
        }
        return { status: false, message: res?.message }
    }
    else {
        return { status: false, message: "Cannot find student!" }
    }
}