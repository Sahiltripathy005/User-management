import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";

import {
  useSelector,
} from "react-redux";

function Profile() {
  const { user } =
    useSelector(
      (state) =>
        state.auth
    );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={5}
    >
      <Paper
        elevation={6}
        sx={{
          width: 450,
          borderRadius: 4,
          overflow:
            "hidden",
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* TOP HEADER */}
        <Box
          sx={{
            background:
              "linear-gradient(135deg,#1976d2,#42a5f5)",
            py: 4,
            display: "flex",
            flexDirection:
              "column",
            alignItems:
              "center",
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              fontSize: 36,
              mb: 2,
            }}
          >
            {user?.name?.[0]}
          </Avatar>

          <Typography
            variant="h5"
            fontWeight="bold"
            color="white"
          >
            {user?.name}
          </Typography>

          <Chip
            label={
              user?.role
            }
            sx={{
              mt: 2,
              textTransform:
                "capitalize",
              fontWeight: 600,
              background:
                "#fff",
            }}
          />
        </Box>

        {/* DETAILS */}
        <Box
          sx={{
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={3}
          >
            Profile Details
          </Typography>

          <Box mb={2}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Full Name
            </Typography>

            <Typography
              variant="body1"
              fontWeight="600"
            >
              {user?.name}
            </Typography>
          </Box>

          <Divider />

          <Box
            my={2}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Email Address
            </Typography>

            <Typography
              variant="body1"
              fontWeight="600"
            >
              {user?.email}
            </Typography>
          </Box>

          <Divider />

          <Box
            mt={2}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Account Role
            </Typography>

            <Typography
              variant="body1"
              fontWeight="600"
              textTransform="capitalize"
            >
              {user?.role}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Profile;