import * as React from "react";
import { Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import sheep from "../recources/sheep.jpg";
import forest from "../recources/forest.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { useLocation } from "react-router-dom";
import { Parallax } from 'react-scroll-parallax';

const Greetings = () => {
  // const location = useLocation();
  // const isShowGreetings =
  //   location.pathname === "/" || location.pathname.includes("/products/")
  //     ? true
  //     : false;

  return (
    <Container maxWidth={false} disableGutters>
      <Parallax speed={-100}>
        <img src={forest} style={{ width: "100%", zIndex: -1, position: "relative" }}></img>
      </Parallax>
      <div style={{zIndex: 1, position: "relative", background: "white"}}>
        <h1>Вітаємо у чарівній крамничці</h1>
        <h1>
          <span className="french-font" style={{ fontSize: "60px" }}>
            Felted Fluffies
          </span>
          !
        </h1>
        <p style={{ fontSize: "20px" }}>
          Тут Ви можете знайти декор для дому, іграшки і прикраси створені в
          техніці сухого валяння з натуральної вовни овець та любові. Валяні
          пухнастики принесуть тепло та затишок у Вашу домівку,
          зігріватимуть ручки і серце 🐑
        </p>
      </div>
    </Container>
  );
};

const MemoizedGreetings = React.memo(Greetings);

export default MemoizedGreetings;
