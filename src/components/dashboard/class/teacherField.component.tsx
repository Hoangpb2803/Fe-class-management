import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ITeacher } from "@/types/teacher.interface";
import { getAllCache } from "@/caches/getAll.cache";
import { toast } from "react-toastify";
import { Box, Stack } from "@mui/material";

interface ITeacherFilter {
    inputValue?: string;
    _id: string;
    name: string;
    major: {
        _id: string;
        name: string;
    };
}

export default function TeacherField({ initialValue }: { initialValue: ITeacher }) {
    const [value, setValue] = React.useState<ITeacherFilter>({
        _id: initialValue._id,
        name: initialValue.name,
        major: initialValue.major,
    });
    const [teachers, setTeachers] = React.useState<ITeacherFilter[]>([]);

    React.useEffect(() => {
        const fetchTeachers = async () => {
            const res = await getAllCache("teacher");
            if (res.data) setTeachers(res.data);
        };

        fetchTeachers();
    }, []);

    const onChange = (
        event: React.SyntheticEvent<Element, Event>,
        newValue: string | ITeacherFilter | null
    ) => {
        if (typeof newValue === "string") {
            //enter click
            const teacher = teachers.find((teacher) => teacher.name === newValue);
            if (teacher) {
                setValue(teacher);
            } else {
                toast.error("This teacher doesn not exist!");
            }
        } else if (newValue) {
            //choosing an option
            setValue(newValue);
        }
    };

    const getOptionLabel = (option: string | ITeacherFilter) => {
        // handle enter click
        if (typeof option === "string") {
            return option;
        }
        // Add teacher's name inputed as an option
        if (option.inputValue) {
            return option.inputValue;
        }
        // show teacher's name
        return option.name;
    };

    return (
        <Autocomplete
            fullWidth
            value={value}
            onChange={onChange}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={teachers}
            getOptionLabel={getOptionLabel}
            renderOption={(props, option) => (
                <li {...props} key={option._id}>
                    <div style={{ width: "100%" }}>
                        <span style={{ width: "50%" }}>{option.name}</span>
                        <span style={{ width: "50%", textAlign: "end" }}>
                            {option.major.name}
                        </span>
                    </div>
                </li>
            )}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Teacher" />}
        />
    );
}
