import { headers } from "@/constants/headers.constant"
import { revalidateTag } from "next/cache"

export const Delete = async (path: string, _id: string) => {
    try {
        const res = await fetch(`${process.env.URL_API + path}/${_id}`, {
            method: "DELETE",
            headers: { ...headers },
        })
        revalidateTag(path)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}