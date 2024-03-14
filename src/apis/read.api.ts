import { headers } from "@/constants/headers.constant"

export const GetAll = async (path: string) => {
    try {
        const res = await fetch(process.env.URL_API + path, {
            headers: { ...headers },
            cache: "no-store"
        })
        return await res.json()
    } catch (error) {
        console.log(error);
        return { data: [] }
    }
}