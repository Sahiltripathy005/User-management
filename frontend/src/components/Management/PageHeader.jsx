import {
  Box,
  Typography,
  Button,
} from "@mui/material";

function PageHeader({
  title,
  buttonText,
  onClick,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        mb: 3,
        p: 2.5,
        borderRadius: 3,
        background:
          "linear-gradient(135deg, #ffffff, #f8fafc)",
        boxShadow:
          "0 4px 16px rgba(0,0,0,0.06)",
        border:
          "1px solid #e5e7eb",
      }}
    >
      {/* TITLE SECTION */}
      <Box>
        <Typography
          variant="h5"
          fontWeight="bold"
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={0.5}
        >
          Manage and organize your{" "}
          {title.toLowerCase()}
        </Typography>
      </Box>

      {/* ACTION BUTTON */}
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          px: 3,
          py: 1,
          borderRadius: 2,
          textTransform:
            "none",
          fontWeight: 600,
          boxShadow:
            "0 4px 12px rgba(25,118,210,0.25)",
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}

export default PageHeader;