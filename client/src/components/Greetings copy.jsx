import * as React from "react";
import { Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import sheep from "../recources/sheep.jpg";
import forest from "../recources/forest.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { useLocation } from "react-router-dom";

const Greetings = () => {
  // const location = useLocation();
  // const isShowGreetings =
  //   location.pathname === "/" || location.pathname.includes("/products/")
  //     ? true
  //     : false;

  return (
    <>
      <Grid container spacing={0} style={{ position: "relative" }}>
        <Grid item xs={12} md={12}>
          <img src={forest} style={{ width: "100%", zIndex: -1 }}></img>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          // md={6}
          // order={{ xs: 2, md: 1 }}
          align="center"
          sx={{
            mb: "50px",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
          }}
          justifyContent="center"
        >
          <div>
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
        </Grid>
        {/* <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <img src={sheep} style={{ width: "100%", zIndex: -1 }}></img>
        </Grid> */}
        {/* <Grid
          item
          xs={12}
          md={12}
          order={{ xs: 3, md: 3 }}
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            bottom: { xs: 0, md: "50px" },
            width: "50px",
          }}
        >
          <AnchorLink href="#store">
            <ExpandCircleDownIcon
              color="primary"
              style={{ fontSize: "50px" }}
            />
          </AnchorLink>
        </Grid> */}
      </Grid>
    </>
  );
};

const MemoizedGreetings = React.memo(Greetings);

export default MemoizedGreetings;
