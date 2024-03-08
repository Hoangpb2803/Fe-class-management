import { headers } from "@/constants/headers.constant"
import { revalidateTag } from "next/cache"

export const Create = async (path: string, data: any) => {
    try {
        const res = await fetch(process.env.URL_API + path, {
            method: "POST",
            headers: { ...headers },
            body: JSON.stringify(data)
        })
        revalidateTag(path)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}