import * as React from "react";
import { Button, Card, Container, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ProductMainImage from "../../components/ProductMainImage";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminGroup() {
  const groupInputRef = React.useRef();

  const [miniatureBlob, setMiniatureBlob] = React.useState();
  const [mainPhotoBlob, setMainPhotoBlob] = React.useState();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const form = {
      name: groupInputRef.current.value,
      miniature: miniatureBlob,
    };

    fetch("/admin/groups", {
      method: "POST",
      body: JSON.stringify(form),
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
        setOpen(false);
        setOpenAlert(true);
      })
      .catch((e) => {
        setOpen(false);
        setOpenAlertError(true);
        console.log(e);
      });
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const [openAlertError, setOpenAlertError] = React.useState(false);

  const handleClickAlertError = () => {
    setOpenAlert(true);
  };

  const handleCloseAlertError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertError(false);
  };

  const handleMainPhotoChange = (file) => {
    setMainPhotoBlob(file)
  }

  const handleMiniatureChange = (file) => {
    setMiniatureBlob(file)
  }

  return (
    <>
      {/* <TopBar showIcon="logout" isShowMenu={true} /> */}
      <Container sx={{ py: 2 }} maxWidth="sm">
        <form onSubmit={submitFormHandler}>
          <div>
          <Typography>Мініатюра:</Typography>
            <ProductMainImage
              handleMainPhotoChange={handleMainPhotoChange}
              handleMiniatureChange={handleMiniatureChange}
            />
          </div>
          <TextField
            label="Група"
            variant="outlined"
            inputRef={groupInputRef}
            fullWidth
            sx={{ py: 2 }}
          />
          <Button variant="contained" type="submit" onClick={handleToggle}>
            Додати
          </Button>
        </form>
        <Card />
      </Container>

      <Backdrop
        // sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Збережено успішно.
        </Alert>
      </Snackbar>

      <Snackbar
        open={openAlertError}
        autoHideDuration={3000}
        onClose={handleCloseAlertError}
      >
        <Alert
          onClose={handleCloseAlertError}
          severity="error"
          sx={{ width: "100%" }}
        >
          Виникла помилка.
        </Alert>
      </Snackbar>
    </>
  );
}
