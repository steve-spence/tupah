"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "lucide-react";
import { Post } from "@/utils/types";

export default function ClientSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setOptions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setOptions(data);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className={`w-[70%] sm:w-[60%] md:w-[50%] ${className}`}>
      <Autocomplete
        freeSolo
        open={open && query.length >= 2}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        getOptionLabel={(option) => typeof option === "string" ? option : option.title}
        loading={loading}
        inputValue={query}
        onInputChange={(_, value) => setQuery(value)}
        onChange={(_, value) => {
          if (value && typeof value !== "string") {
            router.push(`/blog/${value.username}/${value.slug}`);
          }
        }}
        noOptionsText="No posts found"
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <li
              key={option.id}
              {...rest}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                cursor: "pointer",
              }}
            >
              <span style={{ fontWeight: 600 }}>{option.title}</span>
              <span style={{ fontSize: "0.875rem", opacity: 0.7 }}>
                {option.username}
              </span>
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search blogs..."
            variant="outlined"
            slotProps={{
              input: {
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                borderRadius: "9999px",
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "#1272CC" },
                "@media (prefers-color-scheme: dark)": {
                  backgroundColor: "#2a2a2a",
                  "&.Mui-focused fieldset": { borderColor: "#9379cc" },
                },
              },
              "& .MuiInputBase-input": {
                color: "#333",
                "@media (prefers-color-scheme: dark)": {
                  color: "#fff",
                },
                "&::placeholder": {
                  color: "#888",
                  opacity: 1,
                },
              },
            }}
          />
        )}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#fff",
              color: "#333",
              borderRadius: "12px",
              marginTop: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              "@media (prefers-color-scheme: dark)": {
                backgroundColor: "#2a2a2a",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              },
              "& .MuiAutocomplete-option": {
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                "&.Mui-focused": {
                  backgroundColor: "#e8e8e8",
                },
                "@media (prefers-color-scheme: dark)": {
                  "&:hover": {
                    backgroundColor: "#3a3a3a",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#444",
                  },
                },
              },
              "& .MuiAutocomplete-noOptions": {
                color: "#666",
                "@media (prefers-color-scheme: dark)": {
                  color: "#aaa",
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
