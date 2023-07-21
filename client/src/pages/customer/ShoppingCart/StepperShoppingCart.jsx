import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Step0Cart from "./StepsShoppingCart/Step0Cart";
import Step1Order from "./StepsShoppingCart/Step1Order";
import Step2Confirm from "./StepsShoppingCart/Step2Confirm";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";

const steps = ["Кошик", "Дані", "Замовлення"];

const stepsComponents = [Step0Cart, Step1Order, Step2Confirm];

const shoppingCart = localStorage.getItem("shoppingCart");
const shoppingCartArray = JSON?.parse(shoppingCart) || [];

const StepperShoppingCart = (props) => {
  const [orderDetailes, setOrderDetailes] = React.useState({
    products: [...shoppingCartArray],
    pib: "",
    phone: "",
    mail: "",
    city: "",
    post: "",
    messenger: {
      telegram: false,
      viber: false,
    },
    payment: {
      card: false,
      cash: false,
    },
    note: "",
  });
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(0);
  const [isInvalidSteps, setIsInvalidSteps] = React.useState({cart: false, order: false});

  const [isInvalidFields, setIsInvalidFields] = React.useState({
    pib: false,
    phone: false,
    city: false,
    post: false,
    messenger: false,
    payment: false,
  }) 

  console.log(isInvalidFields)

  const validateFields = (stepState) => {
    const fieldsToValidate = ["pib", "phone", "city", "post", "messenger", "payment"]
    let isInvalid = false;
    let validationObj = {
      pib: false,
      phone: false,
      city: false,
      post: false,
      messenger: false,
      payment: false,
    };

    fieldsToValidate.map((field) => {
      console.log(Object.values(stepState[field]))
      if (typeof stepState[field] === "object" && Object.values(stepState[field]).every(item => item === false)) {
        validationObj[field] = true;
        isInvalid = true;
      }

      if (typeof stepState[field] === "string" && !Boolean(stepState[field])) {
        // console.log(stepState)
        validationObj[field] = true;
        isInvalid = true;
      }
    })

    setIsInvalidFields(validationObj);
    setIsInvalidSteps({order: isInvalid});

    return isInvalid;
  }

  React.useEffect(() => {
    if (activeStep === steps.length) {
      localStorage.removeItem("shoppingCart");
      dispatch({ type: "clean" });
      // setOrderDetailes({
      //   products: [],
      //   pib: "",
      //   mail: "",
      //   phone: "",
      // });

      fetch("/order", {
        method: "POST",
        body: JSON.stringify(orderDetailes),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          // loading status
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => console.log(data));
          }
        })
        .then((data) => {
          // setOpen(false);
          // setOpenAlert(true);
          // emptyForm();
        })
        .catch((e) => {
          // setOpen(false);
          // setOpenAlertError(true);
          console.log(e);
        });
    }
  }, [activeStep]);

  const handleNext = () => {  
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isStepFailed = (step) => {
    if (step === 0) {
      return isInvalidSteps.cart;
    }

    if (step === 1) {
      return isInvalidSteps.order;
    }

    return false;
  };

  const getStepAlertMessage = (step) => {
    if (step === 0) {
      return "Оберіть виріб"
    }

    if (step === 1) {
      return "Заповніть обов'язкові поля"
    }
  }

  const otherProps = {
    ...props,
    orderDetailes,
    setOrderDetailes,
    steps,
    activeStep,
    handleBack,
    handleNext,
    setIsInvalidSteps,
    isInvalidFields,
    setIsInvalidFields,
    validateFields,
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const labelProps = {};

            if (isStepFailed(index)) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  {getStepAlertMessage(index)}
                </Typography>
              );
              labelProps.error = true;
            }

            return (
              <Step key={uuidv4()}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, pt: 2, textAlign: "center" }}>
              Дякуємо за замовлення!
            </Typography>
            <Typography sx={{ mt: 2, mb: 1, pb: 2, textAlign: "center" }}>
              Ми з Вами зв&apos;яжемось найближчим часом для підтвердження.
            </Typography>
            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box> */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {stepsComponents.map((Component, index) => {
              if (index === activeStep) {
                return <Component key={uuidv4()} {...otherProps} />;
              }
            })}
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
};

export default StepperShoppingCart;
