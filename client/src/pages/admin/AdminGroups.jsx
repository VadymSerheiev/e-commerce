import { Checkbox, Container, Button } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { DataGrid } from "@mui/x-data-grid";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminGroups() {
  const [initialGroups, setInitialGroups] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchGroups = async () => {
    const response = await fetch("/groups");
    const data = await response.json();
    console.log(data)
    const arrayOfObjects = data.map((item, index) => {
      return {
        index,
        group: item,
      };
    });

    setInitialGroups(data);
  };

  React.useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = () => {
    const data = { groupsToDelete: selectedRows };

    fetch("/admin/groups", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // loading status
        if (res.ok) {
          setOpen(false);
          setOpenAlert(true);
          handleCloseModal();
          fetchGroups();
          // return res.json();
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .catch((e) => {
        setOpen(false);
        setOpenAlertError(true);
        handleCloseModal();
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

  const columns = [
    { field: "name", headerName: "Групи", width: 150, editable: false },
  ];
console.log(initialGroups)
  return (
    <>
      {/* <TopBar showIcon="logout" isShowMenu={true} /> */}
      <Container sx={{ py: 2 }} maxWidth="md">
        <DataGrid
          rows={initialGroups}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          autoHeight
          onSelectionModelChange={(ids) => {
            setSelectedRows(ids);
            console.log(ids);
          }}
        />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={12}
        >
          <Grid item>
            <Button
              variant="contained"
              onClick={handleOpenModal}
              sx={{ my: 2 }}
              color="error"
            >
              {/* handleDelete */}
              Видалити
            </Button>
          </Grid>
        </Grid>

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
            Видалено успішно.
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

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Ви впевнені?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Обрані Вами групи у таблиці будуть видалені.
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={12}
            >
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleDelete}
                  sx={{ mt: 2 }}
                >
                  Так
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleCloseModal}
                  sx={{ mt: 2 }}
                >
                  Ні
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Container>
    </>
  );
}
