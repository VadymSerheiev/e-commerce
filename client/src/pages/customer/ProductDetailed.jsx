import { Button, Container, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import ImageViewer from "react-simple-image-viewer";
import Greetings from "../../components/Greetings";
import { v4 as uuidv4 } from 'uuid';


export default function ProductDetailed() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  console.log(location.state);
  const [product, setProduct] = React.useState({});
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  const [isPhotoLoaded, setIsPhotoLoaded] = React.useState(false);

  React.useEffect(() => {
    const value = {
      code: params.productCode,
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
        //or move to back?
        if (!!data.mainPhoto) {
          data.photos = [data.mainPhoto, ...data.photos];
        }
        setProduct(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params]);

  const clickBackHandler = () => {
    navigate(-1);
    // window.scrollTo(0, 0);
    document.querySelector("#store").scrollIntoView({
      behavior: "smooth",
    });
  };

  const openImageViewer = React.useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      <Greetings />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4} direction="row" justifyContent="center">
          <Grid item xs={12} md={8}>
            {/* {!isPhotoLoaded &&  */}
            <Grid
              container
              spacing={2}
              style={{ display: `${!isPhotoLoaded ? "flex" : "none"}` }}
            >
              <Grid item xs={12}>
                <Skeleton
                  sx={{ width: "100%", height: "100%", aspectRatio: "3/4" }}
                  animation="wave"
                  variant="rectangular"
                />
              </Grid>

              {[0, 1, 2].map((item) => (
                <Grid item xs={4} key={uuidv4()}>
                  <Skeleton
                    sx={{ width: "100%", height: "100%", aspectRatio: "3/4" }}
                    animation="wave"
                    variant="rectangular"
                  />
                </Grid>
              ))}
            </Grid>
            {/* } */}

            {/* {isPhotoLoaded &&  */}
            <Grid
              container
              spacing={2}
              style={{ display: `${isPhotoLoaded ? "flex" : "none"}` }}
            >
              {product?.photos?.map((photo, index) => {
                if (index === 0) {
                  return (
                    <Grid item xs={12} key={uuidv4()}>
                      <img
                        src={photo}
                        style={{ width: "100%" }}
                        onClick={() => openImageViewer(index)}
                        onLoad={() => setIsPhotoLoaded(true)}
                      />
                    </Grid>
                  );
                }

                return (
                  <Grid item xs={4}>
                    <img
                      src={photo}
                      style={{ width: "100%" }}
                      onClick={() => openImageViewer(index)}
                    ></img>
                  </Grid>
                );
              })}
            </Grid>
            {/* } */}
          </Grid>

          {/* </Grid> */}
          {!!product?.name && (
            <Grid item xs={12} md={4}>
              <h2>{product.name}</h2>
              <p>Код: {product.code}</p>
              {product?.description?.split("\n")?.map((item) => (
                <p key={uuidv4()}>{item}</p>
              ))}
              {/* {product.availability ? <p style={{ color: "#1b5e20" }}>В наявності</p> : <p style={{ color: "#d32f2f" }}>Продано</p>} */}
              <p>{product.price} ₴</p>
              <Button onClick={clickBackHandler} variant="contained">
                Повернутись
              </Button>
            </Grid>
          )}
        </Grid>

        {isViewerOpen && (
          <div style={{ zIndex: 2000, position: "relative" }}>
            <ImageViewer
              src={product?.photos}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          </div>
        )}
      </Container>
    </>
  );
}
