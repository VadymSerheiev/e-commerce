import * as React from "react";
import { Button, Checkbox, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";

import InputBase from "@mui/material/InputBase";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";

const renderDateTime = (params) => {
  const dateTime = new Date(params.value);
  return <p>{dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}</p>
}

const EditTextarea = (props) => {
  const { id, field, value, colDef, api } = props;
  const [valueState, setValueState] = React.useState(value);
  const [anchorEl, setAnchorEl] = React.useState();

  const handleRef = (el) => {
    setAnchorEl(el);
  };

  const handleChange = React.useCallback(
    (event) => {
      const newValue = event.target.value;
      setValueState(newValue);
      api.setEditCellValue({ id, field, value: newValue }, event);
    },
    [api, field, id]
  );

  return (
    <div style={{position: "relative", alignSelf: 'flex-start'}} >
      <div
        ref={handleRef}
        style={{
          height: 1,
          width: colDef.computedWidth,
          display: "block",
          position: "absolute",
          top: 0
        }}
      />
      {anchorEl && (
        <Popper open anchorEl={anchorEl} placement="bottom-start">
          <Paper elevation={1} sx={{ p: 1, minWidth: colDef.computedWidth }}>
            <InputBase
              multiline
              rows={4}
              value={valueState}
              sx={{ textarea: { resize: "both" }, width: "100%" }}
              onChange={handleChange}
            />
          </Paper>
        </Popper>
      )}
    </div>
  );
};

const renderEditTextarea = (params) => <EditTextarea {...params} />;

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

export default function AdminRecords() {
  const [initialCards, setInitialCards] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [editedProducts, setEditedProducts] = React.useState({});
  const [initialGroups, setInitialGroups] = React.useState([]);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchRecords = async () => {
    const response = await fetch("/records");
    const data = await response.json();

    const sortedData = data.sort(function (a, b) {
      return b.timestamp - a.timestamp;
    });

    setInitialCards(sortedData);
  };

  React.useEffect(() => {
    fetchRecords();
  }, []);

  const multilineColumn = {
    type: 'string',
    renderEditCell: renderEditTextarea,
  };

  const columns = [
    // { field: "code", headerName: "Код", width: 90 },
    { field: "name", headerName: "Назва", width: 150, editable: true },
    { field: "description", headerName: "Опис", width: 150, editable: true, ...multilineColumn, },
    { field: "timestamp", headerName: "Дата", width: 180, editable: false, type: 'dateTime', renderCell: renderDateTime, },
    // {
    //   field: "availability",
    //   headerName: "Наявність",
    //   width: 150,
    //   editable: true,
    //   type: "boolean",
    // },
    // { field: "price", headerName: "Ціна", width: 150, editable: true },
    // {
    //   field: "group",
    //   headerName: "Група",
    //   width: 150,
    //   editable: true,
    //   type: "singleSelect",
    //   valueOptions: initialGroups,
    // },
  ];

  const handleDelete = () => {
    const data = { codes: selectedRows };
    fetch("/admin/records", {
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
          fetchRecords();
          // console.log(data);
          // return res.json();
        } else {
          return res.json().then((data) => console.log(data));
        }
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

  const processRowUpdate = (newRow) => {
    const newObj = { ...editedProducts };
    newObj[newRow._id] = { ...newRow };
    setEditedProducts(newObj);
    // console.log(newRow)
    return newRow;
  };

  const handleProcessRowUpdateError = (error) => {
    console.log(error);
  };

  const handleSave = () => {
    const editedProductsArray = [];
    for (const key in editedProducts) {
      editedProductsArray.push(editedProducts[key])
  }
    console.log(editedProductsArray);

    const data = {productsToUpdateArray: editedProductsArray};

    fetch("/admin/records", {
      method: "PUT",
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
          fetchRecords();
          // console.log(data);
          // return res.json();
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .catch((e) => {
        setOpen(false);
        setOpenAlertError(true);
        console.log(e);
      });
  };

  return (
    <>
      <Container sx={{ py: 2 }} maxWidth="md">
        <DataGrid
          rows={initialCards}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          onSelectionModelChange={(ids) => {
            setSelectedRows(ids);
            console.log(ids);
          }}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={12}
        >
          <Grid item>
            <Button variant="contained" onClick={handleSave} sx={{ my: 2 }}>
              Зберегти
            </Button>
          </Grid>
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
            Обрані Вами продукти у таблиці будуть видалені.
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
    </>
  );
}
