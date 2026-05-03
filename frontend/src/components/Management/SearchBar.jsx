import { TextField, InputAdornment, IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function SearchBar({ label, value, onChange }) {
  const handleClear = () => {
    onChange({
      target: {
        value: "",
      },
    });
  };

  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      sx={{
        mb: 3,

        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          background: "#fafafa",

          transition: "0.2s ease",

          "&:hover": {
            background: "#fff",
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),

        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} size="small">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}

export default SearchBar;
