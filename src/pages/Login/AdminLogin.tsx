import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import React from "react";
import mainTheme from "themes/mainTheme";
import { State } from "types/adminLogin";
import { testPosts } from "types/blog";
import { testHome } from "types/home";
import { testProjects } from "types/project";
import { testResume } from "types/resume";

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

  const handleSubmit = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/adminLogin`, {
        email: values.email,
        password: values.password,
      })
      .then((resp) => {
        if (resp.data.token) {
          localStorage.setItem("token", resp.data.token);
          localStorage.setItem("edit", "true");
          window.location.replace("/");
        } else {
          alert("Wrong email and password!");
        }
      })
      .catch(() => {});
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleTestAdminClick = () => {
    localStorage.removeItem("token");
    localStorage.setItem("testToken", "TEST");

    localStorage.setItem("home", JSON.stringify(testHome));
    localStorage.setItem("resume", JSON.stringify(testResume));
    localStorage.setItem("projects", JSON.stringify(testProjects));
    localStorage.setItem("posts", JSON.stringify(testPosts));

    localStorage.setItem("edit", "true");
    window.location.replace("/");
  };

  const backgroundColor = "black";

  return (
    <ThemeProvider theme={mainTheme}>
      <Grid border="white solid .25rem">
        <Menu backgroundColor={backgroundColor}></Menu>
        <Grid border="black solid .25rem">
          {new Array(9).fill(true).map((el, idx) => (
            <hr key={idx}></hr>
          ))}
          <Grid sx={{ margin: "0 auto", width: "80%" }}>
            <Grid container direction="column">
              <FormControl sx={{ m: 1 }} variant="outlined">
                <OutlinedInput
                  id="outlined-email"
                  type="text"
                  value={values.email}
                  onChange={handleChange("email")}
                  placeholder="Email"
                  onKeyDown={handleKeyDown}
                  autoFocus
                ></OutlinedInput>
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  placeholder="Password"
                  onKeyDown={handleKeyDown}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                sx={{ m: 1 }}
                variant="contained"
                onKeyDown={handleKeyDown}
                onClick={handleSubmit}
              >
                LOG IN
              </Button>
              <Button
                sx={{
                  m: 1,
                  backgroundColor: "green",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "red",
                  },
                }}
                variant="contained"
                onClick={handleTestAdminClick}
              >
                TEST ADMIN FUNCTIONALITY
              </Button>
            </Grid>
          </Grid>
          {new Array(9).fill(true).map((el, idx) => (
            <hr key={idx}></hr>
          ))}
        </Grid>
        <Footer />
      </Grid>
    </ThemeProvider>
  );
}

export default AdminLogin;
