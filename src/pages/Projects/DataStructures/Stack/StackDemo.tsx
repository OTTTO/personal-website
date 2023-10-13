import { Grid } from "@mui/material";
import { useState } from "react";

export function StackDemo({}) {
  const [stack, setStack] = useState([]);
  return (
    <Grid margin="0 auto 1rem" textAlign="center">
      <Grid
        height="18rem"
        width="10rem"
        margin="0 auto"
        display="flex"
        direction="column"
        justifyContent="flex-end"
        borderRadius="5px"
        sx={{ backgroundColor: "black", opacity: 0.9 }}
      >
        {[]
          .concat(stack)
          .reverse()
          .map((el) => {
            return (
              <Grid
                width="2rem"
                margin="0 auto"
                textAlign="center"
                border="1px solid red"
                sx={{ backgroundColor: "white" }}
              >
                {el}
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
}
