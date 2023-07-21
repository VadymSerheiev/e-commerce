import React from "react";
import Grid from "@mui/material/Grid";
import { Card, Typography } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

const GroupsItem = ({ group, chooseGroupHandler }) => {
  return (
    <Grid
      item
      // key={group.miniature || group.photos[0]}
      xs={6}
      sm={6}
      md={3}
      sx={{cursor: "pointer"}}
      onClick={() => chooseGroupHandler(group.name)}
    >
      <Card>
      <img
        key={uuidv4()}
        // component="img"
        style={{
          objectFit: "cover",
          width: "100%",
          aspectRatio: "1/1",
          // display: `${isPhotoLoaded ? "block" : "none"}`,
        }}
        // sx={{ objectFit: "cover", width: "100%", aspectRatio: "1/1" }}
        src={group.miniature}
        // image={group.miniature || group.photos[0]}
        alt="photo"
        // onLoad={() => setIsPhotoLoaded(true)}
        // onClick={() => clickViewHandler(group.code)}
      />
      <Typography noWrap sx={{ textAlign: "center", m: 2, p: 0, userSelect: "none" }}>
        {group.name || ""}
      </Typography>
      </Card>
    </Grid>
  );
};

export default GroupsItem;
