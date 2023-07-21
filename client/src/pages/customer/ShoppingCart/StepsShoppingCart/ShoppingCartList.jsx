import React from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import { v4 as uuidv4 } from 'uuid';

const ShoppingCartList = ({ items, removeShoppingCartHandler, isShowDelete }) => {
  return (
    <div>
      <table>
        {items.map((item) => (
          <ShoppingCartItem key={uuidv4()} item={item} removeShoppingCartHandler={removeShoppingCartHandler} isShowDelete={isShowDelete}/>
        ))}
      </table>
      <hr />
      <p style={{textAlign: "right"}}>
        Всього:{" "}
        <b>{items.reduce((accumulator, item) => accumulator + item.price, 0)} ₴</b>
      </p>
      <hr />
    </div>
  );
};

export default ShoppingCartList;
