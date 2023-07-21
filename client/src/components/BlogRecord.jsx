import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import Carousel from "react-material-ui-carousel";
import { v4 as uuidv4 } from 'uuid';

export default function BlogRecord({record}) {

  return (
    <>
      <Card sx={{ my: 2 }}>
      <h3 style={{ textAlign: "center" }}>{record.name}</h3>
        <Carousel autoPlay={false}>
          {record.photos.map((item, i) => (
            <CardMedia
            key={uuidv4()}
              component="img"
              // alt="green iguana"
              // height="140"
              image={item}
            />
          ))}
        </Carousel>

        <CardContent>
          <Typography sx={{ textAlign: "justify" }}>
            {record.description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
