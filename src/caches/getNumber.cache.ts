"use server"

import { GetAll } from "@/apis/read.api";
import { cache } from "react";

export const getNumberCache = cache(async (path: string) => {
    const res = await GetAll(`${path}/number`);
    return res;
});