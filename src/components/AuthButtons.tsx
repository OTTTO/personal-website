import { Button, Stack, Typography } from "@mui/material";

export function AuthButtons({
  backgroundColor,
  topPadding,
  handleSaveOnClick,
  disabled = false,
  setEdit,
  edit,
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="right"
      padding={topPadding ? "1rem 1rem 0rem 0rem" : "0rem 1rem 0rem 0rem"}
      spacing={2}
      sx={{ backgroundColor }}
    >
      <Button
        variant="contained"
        onClick={handleSaveOnClick}
        disabled={disabled}
      >
        <Typography variant="h6"> SAVE</Typography>
      </Button>

      {edit && (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setEdit(false);
          }}
        >
          <Typography variant="h6"> VIEW</Typography>
        </Button>
      )}
      {!edit && (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setEdit(true);
          }}
        >
          <Typography variant="h6"> EDIT</Typography>
        </Button>
      )}
    </Stack>
  );
}
