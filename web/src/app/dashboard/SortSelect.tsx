'use client'

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export type SortOption = "newest" | "oldest" | "views" | "likes" | "comments" | "a-z" | "z-a";

interface SortSelectProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
    return (
        <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel
                id="sort-label"
                sx={{
                    color: "gray",
                    "&.Mui-focused": { color: "#9379cc" },
                }}
            >
                Sort by
            </InputLabel>
            <Select
                labelId="sort-label"
                value={value}
                label="Sort by"
                onChange={(e: SelectChangeEvent) => onChange(e.target.value as SortOption)}
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
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="views">Most Views</MenuItem>
                <MenuItem value="likes">Most Likes</MenuItem>
                <MenuItem value="comments">Most Comments</MenuItem>
                <MenuItem value="a-z">A → Z</MenuItem>
                <MenuItem value="z-a">Z → A</MenuItem>
            </Select>
        </FormControl>
    );
}
