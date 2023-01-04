import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CardsList from "../components/CardsList";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container';

export default function ButtonAppBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Grid
              container
              spacing={0}
              alignItems="center"
              direction="row"
              justifyContent="flex-start"
            >
              <Grid item>
                <p>Felted Fluffies</p>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={0}
              alignItems="center"
              direction="row"
              justifyContent="flex-end"
            >
              <Grid item>
                <InstagramIcon />
              </Grid>
              <Grid item>
                <FacebookIcon />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <CardsList />
      </Container>
    </>
  );
}
