import { headers } from "@/constants/headers.constant"
import queryString from "query-string";

export const GetPagination = async (path: string, page: number) => {
    const params = { page }
    const query = queryString.stringify(params)
    try {
        const res = await fetch(process.env.URL_API + path + `/pagination?${query}`, {
            headers: { ...headers },
            // cache: "no-store"
            next: { tags: [path] }
        })
        return await res.json()
    } catch (error) {
        console.error(error);
        return { data: [] }
    }
}