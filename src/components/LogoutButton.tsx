import { Button } from "@mui/material";

export function LogoutButton({ replaceUrl }) {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("testToken");
        window.location.replace(replaceUrl);
      }}
      sx={{ height: "2rem" }}
    >
      LOGOUT
    </Button>
  );
}
