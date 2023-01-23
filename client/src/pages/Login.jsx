import * as React from "react";
import { Button, Card, Container, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router";


export default function Login() {
  const emailInputRef = React.useRef();
  const passwordInputRef = React.useRef();
  const navigate = useNavigate();

  const auth = (url, enteredEmail, enteredPassword) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // loading status
      if (res.ok) {
        sessionStorage.setItem('isAuth', true);
        // must reload
        window.location.pathname = "/admin/page/product";
        return res.json();
      } else {
        return res.json().then((data) => console.log(data));
      }
    }).then((data) => {
      console.log(data)
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
  
    const url = "/users/login";
    auth(url, enteredEmail, enteredPassword)
  }

  return (
    <>
    {/* <TopBar /> */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Card />
        <form onSubmit={submitHandler}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={8}
          >
            <Grid item xs="12">
              <TextField
                label="Пошта"
                variant="standard"
                inputRef={emailInputRef}
              />
            </Grid>
            <Grid item xs="12">
              <TextField
                label="Пароль"
                variant="standard"
                type="password"
                inputRef={passwordInputRef}
              />
            </Grid>
            <Grid item xs="12">
              <Button variant="contained" type="submit">
                Увійти
              </Button>
            </Grid>
          </Grid>
        </form>
        <Card />
      </Container>
    </>
  );
}
