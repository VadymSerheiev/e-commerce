import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "react-image-crop/dist/ReactCrop.css";
import { Button, ButtonGroup, Fab } from "@mui/material";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function fetchImageAsBase64(url) {
  const value = {
    url,
  };

  return fetch('/image', {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.blob();
    })
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = () => {
            resolve(reader.result);
          };
          // console.log(blob)
          reader.readAsDataURL(blob);
        })
    );
}

export default function ProductMainImage({
  handleMainPhotoChange,
  handleMiniatureChange,
  mainPhoto = "",
  setIsMainPhotoModified = () => {},
  setIsMiniatureModified = () => {},
}) {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1 / 1);

  React.useEffect(() => {
    if (Boolean(mainPhoto?.length)) {
      fetchImageAsBase64(mainPhoto)
        .then((base64Image) => {
          // console.log(base64Image)
          setImgSrc(base64Image);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [mainPhoto]);

  function onSelectFile(e) {
    setIsMainPhotoModified(true);
    setIsMiniatureModified(true);
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
      handleMainPhotoChange(imgSrc);
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
        handleMiniatureChange(previewCanvasRef.current.toDataURL("image/jpeg")); // ('image/jpeg', 0.5) - minimize image quality to 50%
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(1 / 1);
      setCrop(centerAspectCrop(width, height, 1 / 1));
    }
  }

  return (
    <div className="App">
      <div className="Crop-Controls">
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          style={{ margin: "10px 0px" }}
        />
        {!!imgSrc && (
          <div style={{ margin: "10px 0px" }}>
            <ButtonGroup
              aria-label="text button group"
              variant="outlined"
              sx={{ mr: 1 }}
            >
              <Button>
                {/* <Fab color="primary" size="small"> */}
                <ZoomOutIcon
                  onClick={() => setScale(Number(scale - 0.1))}
                  size="small"
                />
                {/* </Fab> */}
              </Button>
              <Button>
                <span>{scale.toFixed(1)}</span>
              </Button>
              <Button>
                {/* <Fab color="primary" size="small"> */}
                <ZoomInIcon onClick={() => setScale(Number(scale + 0.1))} />
                {/* </Fab> */}
              </Button>
            </ButtonGroup>

            <ButtonGroup
              aria-label="text button group"
              variant="outlined"
              sx={{ mr: 1 }}
            >
              <Button>
                {/* <Fab color="primary" size="small"> */}
                <RotateLeftIcon
                  onClick={() =>
                    setRotate(Math.min(180, Math.max(-180, Number(rotate - 1))))
                  }
                />
                {/* </Fab> */}
              </Button>
              <Button>
                <span>{rotate}</span>
              </Button>
              <Button>
                {/* <Fab color="primary" size="small"> */}
                <RotateRightIcon
                  onClick={() =>
                    setRotate(Math.min(180, Math.max(-180, Number(rotate + 1))))
                  }
                />
                {/* </Fab> */}
              </Button>
            </ButtonGroup>

            <ButtonGroup aria-label="text button group" variant="outlined">
              <Button>
                {/* <Fab color="primary" size="small"> */}
                <AspectRatioIcon
                  onClick={handleToggleAspectClick}
                  sx={{ height: "24.5px" }}
                />
                {/* </Fab> */}
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => {
            setIsMiniatureModified(true);
            setCrop(percentCrop)
          }}
          onComplete={(c) => {
            setCompletedCrop(c)}}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      <div>
        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
    </div>
  );
}
