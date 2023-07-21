import React from "react";
import ShoppingCartList from "./ShoppingCartList";
import { Box, Button, Container } from "@mui/material";

const Step2Confirm = ({
  orderDetailes,
  steps,
  activeStep,
  handleBack,
  handleNext,
}) => {
  return (
    <>
      <Container sx={{ py: 2 }} maxWidth="sm">
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ width: "30%", color: "rgba(0, 0, 0, 0.6)", padding: "5px 0" }}>ПІБ:</td>
            <td style={{paddingLeft: "10px"}}>{orderDetailes.pib}</td>
          </tr>
          <tr>
            <td style={{ width: "30%", color: "rgba(0, 0, 0, 0.6)", padding: "5px 0" }}>Телефон:</td>
            <td style={{paddingLeft: "10px"}}>{orderDetailes.phone}</td>
          </tr>
          {Boolean(orderDetailes.mail.length) && (
            <tr>
              <td style={{ width: "30%", color: "rgba(0, 0, 0, 0.6)", padding: "5px 0" }}>Електронна пошта:</td>
              <td style={{paddingLeft: "10px"}}>{orderDetailes.mail}</td>
            </tr>
          )}
          <tr>
            <td style={{ width: "30%", color: "rgba(0, 0, 0, 0.6)", padding: "5px 0" }}>Місто:</td>
            <td style={{paddingLeft: "10px"}}>{orderDetailes.city}</td>
          </tr>
          <tr>
            <td style={{ width: "30%", color: "rgba(0, 0, 0, 0.6)", padding: "5px 0" }}>Відділення/поштомат Нової Пошти:</td>
            <td style={{paddingLeft: "10px"}}>{orderDetailes.post}</td>
          </tr>
          <tr>
            <td style={{ width: "30%", color: "rgba(0, 0, 0, 0.6)", padding: "5px 0" }}>Месенджер для звя'зку:</td>
            <td style={{paddingLeft: "10px"}}>
              {orderDetailes.messenger.telegram ? "Telegram " : ""}
              {orderDetailes.messenger.viber ? "Viber" : ""}
            </td>
          </tr>
          <tr>
            <td style={{ width: "30%", color: "rgba(0, 0, 0, 0.6)", padding: "5px 0" }}>Спосіб оплати:</td>
            <td style={{paddingLeft: "10px"}}>
              {orderDetailes.payment.card ? "Картка ПриватБанку" : ""}
              {orderDetailes.payment.cash ? "Накладений платіж" : ""}
            </td>
          </tr>
          {Boolean(orderDetailes.note.length) && (
            <tr>
              <td style={{ width: "30%", color: "rgba(0, 0, 0, 0.6)", padding: "5px 0" }}>Коментар до замовлення:</td>
              <td style={{paddingLeft: "10px"}}>{orderDetailes.note}</td>
            </tr>
          )}
        </table>
        <hr />
        <ShoppingCartList items={orderDetailes.products} isShowDelete={false} />
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
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Замовити" : "Далі"}
        </Button>
      </Box>
    </>
  );
};

export default Step2Confirm;
