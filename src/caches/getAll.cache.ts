"use server"

import { GetAll } from "@/apis/read.api";
import { cache } from "react";

export const getAllCache = cache(async (path: string) => {
    const res = await GetAll(path);
    return res;
});