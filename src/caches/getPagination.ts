"use server"

import { GetPagination } from "@/apis/readPagination";
import { cache } from "react";

export const getPaginationCache = cache(async (path: string, page: number) => {
    const res = await GetPagination(path, page);
    return res;
});