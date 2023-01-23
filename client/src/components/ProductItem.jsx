import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation } from "react-router-dom";
import sheep from "../recources/sheep.jpg";
import { Skeleton } from "@mui/material";

const ProductItem = ({ card, clickViewHandler }) => {
  const [isPhotoLoaded, setIsPhotoLoaded] = React.useState(false);

  return (
    <Grid item key={card.miniature || card.photos[0]} xs={6} sm={6} md={3}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
        onClick={() => clickViewHandler(card.code)}
      >
        <div style={{ position: "relative" }}>
          <Skeleton key={card.miniature || card.photos[0]} sx={{ width: "100%", height: "100%", aspectRatio: "1/1", display: `${!isPhotoLoaded ? "block" : "none"}` }} animation="wave" variant="rectangular" />
          {/* ore better us CardMedia? */}
          <img
            key={card.miniature || card.photos[0]}
            // component="img"
            style={{ objectFit: "cover", width: "100%", aspectRatio: "1/1", display: `${isPhotoLoaded ? "block" : "none"}` }}
            // sx={{ objectFit: "cover", width: "100%", aspectRatio: "1/1" }}
            src={card.miniature || card.photos[0]}
            // image={card.miniature || card.photos[0]}
            alt="photo"
            onLoad={() => setIsPhotoLoaded(true)}
          />
          <Button
            variant="contained"
            color={`${card.availability ? "success" : "error"}`}
            size="small"
            sx={{
              position: "absolute",
              right: 0,
              top: "10%",
              p: "0 4px",
            }}
          >
            {card.availability ? "В наявності" : "Продано"}
          </Button>
        </div>
        <div>
          <Typography noWrap sx={{ textAlign: "center", m: 1, p: 0 }}>
            {card.name || ""}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{ textAlign: "center", m: 1, p: 0 }}
          >
            {card.price} ₴
          </Typography>
        </div>
      </Card>
    </Grid>

  );
};

export default ProductItem;
