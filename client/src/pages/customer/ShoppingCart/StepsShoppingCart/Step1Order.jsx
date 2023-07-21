import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { Box, Button, Container } from "@mui/material";

const Step1Order = ({
  orderDetailes,
  setOrderDetailes,
  steps,
  activeStep,
  handleBack,
  handleNext,
  isInvalidFields,
  validateFields,
}) => {
  const [stepState, setStepState] = React.useState({
    pib: orderDetailes.pib,
    phone: orderDetailes.phone,
    mail: orderDetailes.mail,
    city: orderDetailes.city,
    post: orderDetailes.post,
    messenger: orderDetailes.messenger,
    payment: orderDetailes.payment,
    note: orderDetailes.note,
  });

  // const [state, setState] = React.useState(orderDetailes.messenger);
  // const [payment, setPayment] = React.useState(orderDetailes.payment);

  const handleChange = (event) => {
    setStepState({
      ...stepState,
      messenger: {
        ...stepState.messenger,
        [event.target.name]: event.target.checked,
      }
    });
  };
  const handleChangePayment = (event) => {
    setStepState({
      ...stepState,
      payment: {
        card: false,
        cash: false,
        [event.target.name]: event.target.checked,
      }
    });
  };

  // duplicated logic
  const onBeforeBack = () => {
    // const isInvalid = validateFields(stepState);

    // if (isInvalid) return;

    setOrderDetailes({ ...orderDetailes, ...stepState });
    handleBack();
  };

  const onBeforeNext = () => {
    setOrderDetailes({ ...orderDetailes, ...stepState });
    const isInvalid = validateFields(stepState);

    if (isInvalid) return;

    handleNext();
  };

  return (
    <>
      <Container sx={{ py: 2 }} maxWidth="sm">
        <TextField
          label="ПІБ"
          variant="outlined"
          value={stepState.pib}
          onChange={(event) =>
            setStepState({ ...stepState, pib: event.target.value })
          }
          fullWidth
          sx={{ py: 2 }}
          required
          error={isInvalidFields.pib}
        />
        <TextField
          label="Телефон"
          variant="outlined"
          value={stepState.phone}
          onChange={(event) =>
            setStepState({ ...stepState, phone: event.target.value })
          }
          fullWidth
          sx={{ py: 2 }}
          required
          error={isInvalidFields.phone}
        />
        <TextField
          label="Електронна пошта"
          variant="outlined"
          value={stepState.mail}
          onChange={(event) =>
            setStepState({ ...stepState, mail: event.target.value })
          }
          fullWidth
          sx={{ py: 2 }}
        />
        <TextField
          label="Місто"
          variant="outlined"
          value={stepState.city}
          onChange={(event) =>
            setStepState({ ...stepState, city: event.target.value })
          }
          fullWidth
          sx={{ py: 2 }}
          required
          error={isInvalidFields.city}
        />
        <TextField
          label="Відділення/поштомат Нової Пошти"
          variant="outlined"
          value={stepState.post}
          onChange={(event) =>
            setStepState({ ...stepState, post: event.target.value })
          }
          fullWidth
          sx={{ py: 2 }}
          required
          error={isInvalidFields.post}
        />
        <FormControl
          sx={{ py: 1 }}
          component="fieldset"
          variant="standard"
          required
          error={isInvalidFields.messenger}
        >
          <FormLabel>Месенджер для звя'зку</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepState.messenger.telegram}
                  onChange={handleChange}
                  name="telegram"
                />
              }
              label="Telegram"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepState.messenger.viber}
                  onChange={handleChange}
                  name="viber"
                />
              }
              label="Viber"
            />
          </FormGroup>
          {/* <FormHelperText></FormHelperText> */}
        </FormControl>
        <br />
        <FormControl sx={{ py: 1 }} error={isInvalidFields.payment} required>
          <FormLabel>
            Спосіб оплати
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue="card"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="card"
              control={<Radio 
                checked={stepState.payment.card}
                onChange={handleChangePayment}
                name="card"
              />}
              label="Картка ПриватБанку"
            />
            <FormControlLabel
              value="cash"
              control={<Radio 
                checked={stepState.payment.cash}
                onChange={handleChangePayment}
                name="cash"
              />}
              label="Накладений платіж"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Коментар до замовлення"
          variant="outlined"
          // inputRef={nameInputRef}
          value={stepState.note}
          onChange={(event) =>
            setStepState({ ...stepState, note: event.target.value })
          }
          fullWidth
          sx={{ py: 2 }}
          multiline
          rows={2}
        />
      </Container>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={onBeforeBack}
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

export default Step1Order;
