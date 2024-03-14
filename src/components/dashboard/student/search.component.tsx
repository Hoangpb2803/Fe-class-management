"use client";

import { TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchStudent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;

        // set query url when change search bar
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("name", value);
        } else {
            params.delete("name");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <TextField
            name="seach"
            label="Search name"
            variant="outlined"
            sx={{ width: "40%" }}
            onChange={onChange}
        />
    );
}
