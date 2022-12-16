import { Box, Typography } from "@mui/material";

export function Footer({ backgroundColor }) {
  return (
    <Box
      sx={{
        backgroundColor: { backgroundColor },
        padding: "0rem 0rem 1rem 1rem",
      }}
    >
      <Typography color="white" paddingTop="1rem">
        © Dylan Beckwith 2022
      </Typography>
    </Box>
  );
}
