"use server"

import { Delete } from "@/apis/delete.api";
import { IResponse } from "@/types/response.interface"

export default async function deleteAction(path: string, _id: string): Promise<IResponse> {
    const res = await Delete(path, _id)

    if (res.statusCode === 200) {
        return {
            status: true
        }
    }
    return {
        status: false,
    }


}