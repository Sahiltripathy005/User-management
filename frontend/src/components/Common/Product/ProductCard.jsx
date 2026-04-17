import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

function ProductCard({
  title,
  price,
  image,
  onClick,
}) {
  return (
    <Card
      sx={{
        width: 250,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      {/* IMAGE */}
      <CardMedia
        component="img"
        height="150"
        image={image}
        alt={title}
      />

      <CardContent>
        {/* TITLE */}
        <Typography variant="h6">
          {title}
        </Typography>

        {/* PRICE */}
        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
        >
          ₹ {price}
        </Typography>

        {/* BUTTON */}
        <Button
          variant="contained"
          fullWidth
          onClick={onClick}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;