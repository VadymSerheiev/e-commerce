import { Box, Button, Container } from "@mui/material";
import React from "react";
import ShoppingCartList from "./ShoppingCartList";
import { useSelector, useDispatch } from "react-redux";

const Step0Cart = ({ 
  orderDetailes, 
  setOrderDetailes,
  steps,
  activeStep,
  handleBack,
  handleNext,
  setIsInvalidSteps,
 }) => {
  const dispatch = useDispatch();

  const setShoppingCartCounter = () => {
    dispatch({ type: "decrement" });
  };

  const removeShoppingCartHandler = (removeItem) => {
    const updatedShoppingCart = orderDetailes.products.filter(
      (cartItem) => cartItem.code !== removeItem.code
    );
    setOrderDetailes({ ...orderDetailes, products: updatedShoppingCart });
    localStorage.setItem("shoppingCart", JSON.stringify(updatedShoppingCart));
    setShoppingCartCounter();
  };

  const onBeforeNext = () => {
    if (!Boolean(orderDetailes.products?.length)) {
      setIsInvalidSteps({cart: true})
      return;
    }

    handleNext();
  }

  return (
    <>
    <Container sx={{ py: 2 }} maxWidth="sm">
      <ShoppingCartList
        items={orderDetailes.products}
        removeShoppingCartHandler={removeShoppingCartHandler}
        isShowDelete={true}
      />
    </Container>

    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Назад
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={onBeforeNext}>
          {activeStep === steps.length - 1 ? "Замовити" : "Далі"}
        </Button>
      </Box>
    </>
  );
};

export default Step0Cart;
