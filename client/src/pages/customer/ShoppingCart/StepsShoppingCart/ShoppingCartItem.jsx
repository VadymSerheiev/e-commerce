import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Grid } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

const ShoppingCartItem = ({
  item,
  removeShoppingCartHandler = () => {},
  isShowDelete = true,
}) => {
  return (
    <tr>
      <td style={{width: "30%"}}>
        <img
          key={uuidv4()}
          style={{
            objectFit: "cover",
            width: "100%",
            aspectRatio: "1/1",
          }}
          src={item.miniature || item.photos[0]}
          alt="photo"
        />
      </td>

      <td style={{paddingLeft: "10px"}}>
        <p style={{margin: "10px 0"}}>{item.name}</p>
        <p style={{margin: "10px 0"}}>Код: {item.code}</p>
        <p style={{margin: "10px 0"}}>Ціна: {item.price} ₴</p>
      </td>

      {isShowDelete && (
        <td>
          <Button
            variant="outlined"
            sx={{ padding: "5px", minWidth: "24px" }}
            onClick={() => removeShoppingCartHandler(item)}
          >
            <DeleteForeverIcon sx={{ margin: 0 }} color="primary" />
          </Button>
        </td>
      )}
    </tr>
  );
};

export default ShoppingCartItem;
