import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

function AdminCard({
  title,
  description,
  buttonText,
  onClick,
  icon,
}) {
  return (
    <Card
      sx={{
        width: 250,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
        p: 2,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardContent>
        {/* ICON */}
        <Box mb={1}>
          {icon}
        </Box>

        {/* TITLE */}
        <Typography variant="h6">
          {title}
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
        >
          {description}
        </Typography>

        {/* BUTTON */}
        <Button
          variant="contained"
          fullWidth
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

export default AdminCard;