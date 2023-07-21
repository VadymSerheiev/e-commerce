import React from "react";
import Grid from "@mui/material/Grid";
import GroupsItem from "./GroupItem";
import { useNavigate, useLocation } from "react-router-dom";
const { v4: uuidv4 } = require('uuid');

const GroupsList = ({ groups, chooseGroupHandler}) => {
    const navigate = useNavigate();
    const location = useLocation();

  return (
    <Grid container spacing={2}>
      {groups.map((group) => (
        <GroupsItem key={uuidv4()} group={group} chooseGroupHandler={chooseGroupHandler}/>
      ))}
    </Grid>
  );
};

export default GroupsList;
