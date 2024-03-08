"use server"

import { GetOne } from "@/apis/readOne.api";
import { cache } from "react";

export const getDetailCache = cache(async (path: string, _id: string) => {
    const res = await GetOne(path, _id);
    return res;
});