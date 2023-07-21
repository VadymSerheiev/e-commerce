import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';


const ProductItem = ({ card, clickViewHandler }) => {
  // const shoppingCartCounter = useSelector(state => state.counter)
  const dispatch = useDispatch();

  const setShoppingCartCounter = () => {
    dispatch({type: "increment"});
  }

  const [isPhotoLoaded, setIsPhotoLoaded] = React.useState(false);
  const addShoppingCartHandler = () => {
    const shoppingCart = localStorage?.getItem('shoppingCart');

    if (!shoppingCart) {
      console.log(card)
      const item = JSON.stringify([card])
      localStorage?.setItem('shoppingCart', [item]);
    }

    if (!!shoppingCart) {
      const items = JSON.parse(shoppingCart)
      const newItems = JSON.stringify([...items, card])
      localStorage?.setItem('shoppingCart', newItems);
    }

    setShoppingCartCounter()
  }

  return (
    <Grid item key={uuidv4()} xs={6} sm={6} md={3}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        <div style={{ position: "relative" }}>
          <Skeleton
            key={uuidv4()}
            sx={{
              width: "100%",
              height: "100%",
              aspectRatio: "1/1",
              display: `${!isPhotoLoaded ? "block" : "none"}`,
            }}
            animation="wave"
            variant="rectangular"
          />
          {/* ore better us CardMedia? */}
          <img
            key={uuidv4()}
            // component="img"
            style={{
              objectFit: "cover",
              width: "100%",
              aspectRatio: "1/1",
              display: `${isPhotoLoaded ? "block" : "none"}`,
            }}
            // sx={{ objectFit: "cover", width: "100%", aspectRatio: "1/1" }}
            src={card.miniature || card.photos[0]}
            // image={card.miniature || card.photos[0]}
            alt="photo"
            onLoad={() => setIsPhotoLoaded(true)}
            onClick={() => clickViewHandler(card.code)}
          />
        </div>
        <div>
          <Typography noWrap sx={{ textAlign: "center", m: 1, p: 0 }}>
            {card.name || ""}
          </Typography>

          <div style={{ margin: "8px" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                variant="outlined"
                sx={{ padding: "5px", minWidth: "24px" }}
                onClick={() => clickViewHandler(card.code)}
              >
                <VisibilityIcon sx={{ margin: 0 }} />
              </Button>

              <Typography
                variant="h5"
                component="h2"
                sx={{
                  textAlign: "center",
                  // m: 1,
                  p: 0,
                  display: "inline-block",
                }}
              >
                {card.price} ₴
              </Typography>

              <Button
                variant="outlined"
                sx={{ padding: "5px", minWidth: "24px" }}
                onClick={addShoppingCartHandler}
              >
                <AddShoppingCartIcon sx={{ margin: 0 }} />
              </Button>
            </Grid>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default ProductItem;
