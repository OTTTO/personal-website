import { ArticleOutlined, HomeTwoTone } from "@mui/icons-material";
import { Box, Fab, Stack, Typography } from "@mui/material";

export function Menu({ backgroundColor }) {
  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          backgroundColor: { backgroundColor },
          "padding-left": "1rem",
        }}
      >
        <Fab variant="extended" href="/" sx={{ margin: "1rem 1rem 0rem 0rem" }}>
          <HomeTwoTone sx={{ mr: 1 }} />
          <Typography variant="h6">HOME</Typography>
        </Fab>
        <Fab
          variant="extended"
          href="/resume"
          sx={{ margin: "1rem 1rem 0rem 0rem" }}
        >
          <ArticleOutlined sx={{ mr: 1 }} />
          <Typography variant="h6">RESUME</Typography>
        </Fab>
      </Stack>
    </Box>
  );
}
