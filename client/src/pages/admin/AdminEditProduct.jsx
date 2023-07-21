import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ProductMainImage from "../../components/ProductMainImage";
import { useNavigate, useParams } from "react-router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminEditProduct() {
  const params = useParams();

  const [product, setProduct] = React.useState({
    name: "",
    description: "",
    price: 0,
    group: "",
    mainPhoto: "",
  });

  // console.log("product", product);
  React.useEffect(() => {
    const value = {
      id: params.productId,
    };

    fetch("/product", {
      method: "POST",
      body: JSON.stringify(value),
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
        setProduct(data);
        setFiles(data.photos)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params]);

  const formRef = React.useRef();
  const fileInputRef = React.useRef();
  const nameInputRef = React.useRef();
  const descriptionInputRef = React.useRef();
  const priceInputRef = React.useRef();
  const availabilityInputRef = React.useRef();
  const groupInputRef = React.useRef();

  const [files, setFiles] = React.useState();
  const [selectValue, setSelectValue] = React.useState("");
  const [blob, setBlob] = React.useState();
  const [miniatureBlob, setMiniatureBlob] = React.useState();
  const [mainPhotoBlob, setMainPhotoBlob] = React.useState();
  const [fileName, setFileName] = React.useState();
  const [initialGroups, setInitialGroups] = React.useState([]);
  const [isMainPhotoModified, setIsMainPhotoModified] = React.useState(false);
  const [isMiniatureModified, setIsMiniatureModified] = React.useState(false);
  const [isPhotosModified, setIsPhotosModified] = React.useState(false);

  console.log(isMainPhotoModified, isMiniatureModified, isPhotosModified)

  React.useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch("/groups");
      const data = await response.json();

      const arrayOfObjects = data.map((item, index) => {
        return {
          index,
          group: item.name,
        };
      });

      setInitialGroups(arrayOfObjects);
    };

    fetchGroups();
  }, []);

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

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function handleChange(e) {
    setIsPhotosModified(true);
    setFiles(
      Array.from(e.target.files).map((file) => URL.createObjectURL(file))
    );

    let arrayOfBlobs = [];
    let arrayOfNames = [];

    const photosArray = Array.from(e.target.files);

    for (let i = 0; i < photosArray.length; i++) {
      const base64 = await convertBase64(photosArray[i]);

      arrayOfBlobs.push(base64);
      arrayOfNames.push(photosArray[i].name);
    }

    console.log(arrayOfBlobs);
    console.log(arrayOfNames);

    setBlob(arrayOfBlobs);
    setFileName(arrayOfNames); //array
  }

  const [checkboxValue, setCheckboxValue] = React.useState(false);

  function handleChangeCheckbox(e) {
    setCheckboxValue(!checkboxValue);
  }

  const [groupValue, setGroupValue] = React.useState("");

  const handleChangeSelect = (event) => {
    setGroupValue(event.target.value);
  };

  const emptyForm = () => {
    // formRef.current.reset()
    nameInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    priceInputRef.current.value = "";
    fileInputRef.current.value = "";
    setBlob([]);
    setGroupValue("");
    setFiles([]);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const form = {
      _id: product._id,
      name: product.name,
      description: product.description,
      price: +product.price,
      group: product.group,
    };

    // miniature: miniatureBlob,
    //   mainPhoto: mainPhotoBlob,
    //   photos: blob,

    if (isMainPhotoModified) {
      form.mainPhoto = mainPhotoBlob;
    }

    if (isMiniatureModified) {
      form.miniature = miniatureBlob;
    }

    if (isPhotosModified) {
      form.photos = blob;
    }

    fetch("/admin/products", {
      method: "PUT",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // loading status
        if (res.ok) {
          // return res.json();
        } else {
          return res.json().then((data) => console.log(data));
        }
      })
      .then((data) => {
        setOpen(false);
        setOpenAlert(true);
        emptyForm();
      })
      .catch((e) => {
        setOpen(false);
        setOpenAlertError(true);
        console.log(e);
      });
  };

  const handleMainPhotoChange = (file) => {
    setMainPhotoBlob(file);
  };

  const handleMiniatureChange = (file) => {
    setMiniatureBlob(file);
  };

  return (
    <>
      {/* <TopBar showIcon="logout" isShowMenu={true} /> */}
      <Container sx={{ py: 2 }} maxWidth="sm">
        <form onSubmit={submitFormHandler} ref={formRef}>
          <div>
            <Typography>Основне фото/мініатюра:</Typography>
            <ProductMainImage
              handleMainPhotoChange={handleMainPhotoChange}
              handleMiniatureChange={handleMiniatureChange}
              setIsMainPhotoModified={setIsMainPhotoModified}
              setIsMiniatureModified={setIsMiniatureModified}
              mainPhoto={product.mainPhoto}
            />
          </div>
          <div>
            <Typography>Інші фото:</Typography>
            {files?.map((file) => (
              <img src={file} style={{ height: "100px" }} />
            ))}
          </div>
          <input
            type="file"
            onChange={handleChange}
            multiple
            style={{ margin: "10px 0px" }}
            ref={fileInputRef}
          ></input>
          <TextField
            label="Назва"
            variant="outlined"
            value={product.name}
            onChange={(e) => setProduct({...product, name: e.target.value})}
            inputRef={nameInputRef}
            fullWidth
            sx={{ py: 2 }}
          />
          <TextField
            fullWidth
            label="Опис"
            value={product.description}
            onChange={(e) => setProduct({...product, description: e.target.value})}
            variant="outlined"
            multiline
            inputRef={descriptionInputRef}
            sx={{ py: 2 }}
          />
          <TextField
            fullWidth
            label="Ціна"
            value={product.price}
            onChange={(e) => setProduct({...product, price: e.target.value})}
            variant="outlined"
            multiline
            inputRef={priceInputRef}
            sx={{ py: 2 }}
          />

          <FormControl fullWidth sx={{ py: 2 }}>
            <InputLabel>Група</InputLabel>
            <Select
              label="Група"
              onChange={(e) => setProduct({...product, group: e.target.value})}
              inputRef={groupInputRef}
              value={product.group}
            >
              {initialGroups.map((group) => {
                return <MenuItem value={group.group}>{group.group}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit" onClick={handleToggle}>
            Оновити
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
