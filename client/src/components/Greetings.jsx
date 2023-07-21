import * as React from "react";
import { Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import sheep from "../resources/sheep.jpg";
import forest from "../resources/forest.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { useLocation } from "react-router-dom";
// import { Parallax } from 'react-scroll-parallax';

const Greetings = () => {
  // const location = useLocation();
  // const isShowGreetings =
  //   location.pathname === "/" || location.pathname.includes("/products/")
  //     ? true
  //     : false;

  return (
    <Container maxWidth={false} disableGutters style={{ position: "relative" }}>
      <div className="parallax"></div>

      <div
        style={{
          zIndex: 1,
          position: "absolute",
          top: 0,
          textAlign: "center",
          width: "100%",
        }}
      >
        <h1>Вітаємо у чарівній крамничці</h1>
        <h1>
          <span className="french-font" style={{ fontSize: "60px" }}>
            Felted Fluffies
          </span>
          !
        </h1>
      </div>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        style={{
          fontSize: "20px",
          color: "white",
          zIndex: 1,
          position: "absolute",
          bottom: "5%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Grid item xs={11} md={6}>
          <p>
            Тут Ви можете знайти декор для дому, іграшки і прикраси створені в
            техніці сухого валяння з натуральної вовни овець та любові. Валяні
            пухнастики принесуть тепло та затишок у Вашу домівку, зігріватимуть
            ручки і серце 🐑
          </p>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        style={{
          fontSize: "20px",
          color: "white",
          zIndex: 1,
          position: "absolute",
          bottom: "0%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Grid item xs={11} md={6}>
          <AnchorLink href="#store">
            <ExpandCircleDownIcon
              // color="primary"
              style={{ fontSize: "50px", color: 'white' }}
            />
          </AnchorLink>
        </Grid>
      </Grid>
    </Container>
  );
};

const MemoizedGreetings = React.memo(Greetings);

export default MemoizedGreetings;
