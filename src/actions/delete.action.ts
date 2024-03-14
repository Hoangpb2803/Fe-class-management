"use server"

import { Delete } from "@/apis/delete.api";
import { IResponse } from "@/types/response.interface"

export default async function deleteAction<T>(path: string, _id: string): Promise<IResponse<T[]>> {
    if (_id) {
        const res = await Delete(path, _id)

        if (res.data) {
            return { status: true, data: res.data }
        }
        return { status: false, message: res?.message }
    }
    else {
        return { status: false, message: "Cannot find student!" }
    }
}