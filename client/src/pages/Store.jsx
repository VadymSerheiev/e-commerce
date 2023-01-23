import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Breadcrumbs,
  Chip,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import * as React from "react";
import ProductsList from "../components/ProductsList";
import Greetings from "../components/Greetings";
import { useNavigate, useLocation } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
// import TopBatClient from "../components/TopBarClient";

export default function Store({cards: initialCards, groups: initialGroups}) {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const page = params.get("page");
  const paramsGroup = params.get("group");

  const [filteredCards, setFilteredCards] = React.useState([]);
  const [activeGroup, setActiveGroup] = React.useState('Всі продукти');

  React.useEffect(() => {
    const filteredCards = initialCards?.filter((card) => {
      if (paramsGroup === 'Всі групи' || !!paramsGroup === false) return true;

      return card.group === paramsGroup;
    })

    setFilteredCards(filteredCards)
  }, [initialCards.length, activeGroup]);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      // onClick={handleClick}
    >
      Магазин
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/"
      // onClick={handleClick}
    >
      Всі групи
    </Link>,
  ];

  const chooseGroupHandler = (e) => {
    const value = e.target.innerText
    setActiveGroup(value)
    navigate(`${location.pathname}?group=${value}&page=1`)
  }

  return (
    <>
      {/* <TopBar showIcon="login" /> */}
      {/* <TopBatClient /> */}
    <Greetings />
      <div id="store"></div>
      <Container
        sx={{ py: 8 }}
        maxWidth="lg"
        // style={{ backgroundColor: "grey" }}
      >
        {/* <p>All items</p> */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
            {/* <Stack direction="row" spacing={2}> */}
              {initialGroups?.map((group, index) => {
                const activeGroup = (group === paramsGroup || (!!paramsGroup === false && group === "Всі групи")) ? "" : {variant: "outlined"};
                return <Chip sx={{m: 1}} label={group} color="primary" key={index} onClick={chooseGroupHandler} {...activeGroup}/>
              })}
              {/* <Chip label="Group 1" color="primary"  />
              <Chip label="Group 2" color="primary" variant="outlined" />
              <Chip label="Group 3" color="primary" variant="outlined" /> */}
            {/* </Stack> */}

        </Grid>
        <Breadcrumbs
          sx={{ py: 2 }}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
        <ProductsList cards={filteredCards} />
      </Container>
    </>
  );
}
