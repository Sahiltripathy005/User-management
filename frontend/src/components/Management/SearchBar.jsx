import {
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function SearchBar({
  label,
  value,
  onChange,
}) {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      sx={{
        mb: 3,

        "& .MuiOutlinedInput-root":
          {
            borderRadius: 3,
            background:
              "#fafafa",

            transition:
              "0.2s ease",

            "&:hover": {
              background:
                "#fff",
            },
          },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;