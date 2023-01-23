import * as React from "react";
import { Button, Card, Container, Grid, TextField } from "@mui/material";
// import { useNavigate } from "react-router";

import { useNavigate, useLocation } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("/users/logout").then((res) => {
      if (res.ok) {
        sessionStorage.setItem("isAuth", false);
        window.location.href = "/"
      } else {
      }
    }).catch((e) => console.log(e));
  }, []);

  return <></>;
}
