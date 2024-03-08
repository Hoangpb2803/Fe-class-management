import { headers } from "@/constants/headers.constant"

export const GetOne = async (path: string, _id: string) => {
    try {
        const res = await fetch(process.env.URL_API + `${path}/${_id}`, {
            headers: { ...headers }
        })
        return await res.json()
    } catch (error) {
        console.log(error);
        return { data: [] }
    }
}