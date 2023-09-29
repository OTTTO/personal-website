import { Divider } from "@mui/material";

export function PostHeaderDivider() {
  return (
    <>
      <Divider
        sx={{
          borderColor: "white",
          borderBottomWidth: 2,
        }}
      />
      <Divider
        sx={{
          borderColor: "black",
          borderBottomWidth: 2,
        }}
      />
      <Divider
        sx={{
          borderColor: "white",
          borderBottomWidth: 2,
        }}
      />
    </>
  );
}
