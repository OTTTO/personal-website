import {
  AdminPanelSettingsOutlined,
  ArticleOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import { Box, Fab, Stack, Typography } from "@mui/material";

export function Menu({ backgroundColor }) {
  return (
    <Box
      sx={{
        backgroundColor: { backgroundColor },
        padding: "0rem 0rem 1rem 1rem",
      }}
    >
      <Stack direction="row">
        <Stack direction="row">
          <Fab
            variant="extended"
            href="/"
            sx={{ margin: "1rem 1rem 0rem 0rem" }}
          >
            <HomeOutlined sx={{ mr: 1 }} />
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
        <Stack
          direction="row"
          sx={{
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Fab
            variant="extended"
            href="/admin"
            sx={{ margin: "1rem 1rem 0rem 0rem" }}
          >
            <AdminPanelSettingsOutlined sx={{ mr: 1 }} />
            <Typography variant="h6">ADMIN</Typography>
          </Fab>
        </Stack>
      </Stack>
    </Box>
  );
}
