'use client'

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { PostStatus } from "@/utils/types";

interface DisplaySelectProps {
    value: PostStatus;
    onChange: (value: PostStatus) => void;
}

export default function DisplaySelect({ value, onChange }: DisplaySelectProps) {
    return (
        <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel
                id="display-label"
                sx={{
                    color: "gray",
                    "&.Mui-focused": { color: "#9379cc" },
                }}
            >
                Display
            </InputLabel>
            <Select
                labelId="display-label"
                value={value}
                label="Display"
                onChange={(e: SelectChangeEvent) => onChange(e.target.value as PostStatus)}
                sx={{
                    color: "inherit",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "gray",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9379cc",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9379cc",
                    },
                    "& .MuiSvgIcon-root": {
                        color: "gray",
                    },
                }}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Drafts</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
            </Select>
        </FormControl>
    );
}
