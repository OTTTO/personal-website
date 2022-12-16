import { useLazyQuery } from "@apollo/client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  ThemeProvider,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import { ADMIN_LOGIN } from "queries/adminLogin";
import React from "react";
import mainTheme from "themes/mainTheme";

interface LoginForm {
  email: string;
  password: string;
}

interface State extends LoginForm {
  showPassword: boolean;
}

function AdminLogin() {
  const [values, setValues] = React.useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [adminLogin] = useLazyQuery(ADMIN_LOGIN);

  const handleSubmit = async () => {
    const response = await adminLogin({
      variables: { email: values.email, password: values.password },
    });
    console.log(response);
    if (!response.data.signInAdmin) {
      alert("Wrong email and password");
    } else {
      localStorage.setItem("token", response.data.signInAdmin);
      window.location.replace("/resume");
    }
  };

  const backgroundColor = "black";

  return (
    <ThemeProvider theme={mainTheme}>
      <Menu backgroundColor={backgroundColor}></Menu>
      {new Array(9).fill(true).map((el, idx) => (
        <hr key={idx}></hr>
      ))}
      <Box sx={{ margin: "0 auto", width: "80%" }}>
        <Stack direction="column">
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="outlined-email"
              type="text"
              value={values.email}
              onChange={handleChange("email")}
              placeholder="Email"
            ></OutlinedInput>
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              placeholder="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            sx={{ m: 1 }}
            variant="contained"
            onClick={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          >
            LOG IN
          </Button>
        </Stack>
      </Box>
      {new Array(9).fill(true).map((el, idx) => (
        <hr key={idx}></hr>
      ))}
      <Footer backgroundColor={backgroundColor}></Footer>
    </ThemeProvider>
  );
}

export default AdminLogin;
