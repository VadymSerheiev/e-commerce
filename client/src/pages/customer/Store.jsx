import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Chip, Grid, Link, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Greetings from "../../components/Greetings";
import GroupsList from "../../components/GroupsList";
import ProductsList from "../../components/ProductsList";
import { v4 as uuidv4 } from "uuid";

export default function Store({ cards: initialCards, groups: initialGroups }) {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const page = params.get("page");
  const paramsGroup = params.get("group");

  const [filteredCards, setFilteredCards] = React.useState([]);
  const [activeGroup, setActiveGroup] = React.useState("Всі продукти");

  React.useEffect(() => {
    const filteredCards = initialCards?.filter((card) => {
      if (paramsGroup === "Всі групи" || !!paramsGroup === false) return true;

      return card.group === paramsGroup;
    });

    setFilteredCards(filteredCards);
  }, [initialCards.length, activeGroup]);

  const breadcrumbs = [
    <Link
      underline="hover"
      key={uuidv4()}
      color="inherit"
      href="/"
      // onClick={handleClick}
    >
      Магазин
    </Link>,
    <Link
      underline="hover"
      key={uuidv4()}
      color="inherit"
      href={`/?group=${paramsGroup}&page=1`}
      // onClick={handleClick}
    >
      {`${paramsGroup}`}
    </Link>,
  ];

  const chooseGroupHandler = (group) => {
    const value = group;
    setActiveGroup(value);
    navigate(`${location.pathname}?group=${value}&page=1`);
  };

  const chooseButtonGroupHandler = (e) => {
    const value = e.target.innerText;
    setActiveGroup(value);
    navigate(`${location.pathname}?group=${value}&page=1`);
  };

  return (
    <>
      <Greetings />
      <div id="store"></div>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ my: 2 }}
        >
          {initialGroups?.map((group, index) => {
            const activeGroup =
              group.name === paramsGroup
                ? // || (!!paramsGroup === false && group.name === "Всі групи")
                  ""
                : { variant: "outlined" };
            return (
              <Chip
                sx={{ m: 1 }}
                label={group.name}
                color="primary"
                key={uuidv4()}
                onClick={chooseButtonGroupHandler}
                {...activeGroup}
              />
            );
          })}
        </Grid>
        {!Boolean(paramsGroup) && (
          <GroupsList
            groups={initialGroups}
            chooseGroupHandler={chooseGroupHandler}
          />
        )}
        {!Boolean(paramsGroup) &&<Typography align="center" variant="h6" sx={{ my: 2 }}>
          Всі продукти
        </Typography>}
        {Boolean(paramsGroup) &&<Typography align="left" variant="h6" sx={{ my: 2 }}>
          {paramsGroup}
        </Typography>}
        {Boolean(paramsGroup) && (
          <Breadcrumbs
            sx={{ my: 2, py: 0 }}
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        )}
        <ProductsList cards={filteredCards} />
      </Container>
    </>
  );
}
