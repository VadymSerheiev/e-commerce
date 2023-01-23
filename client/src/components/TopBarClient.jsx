import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LoginIcon from "@mui/icons-material/Login";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link, Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Grid from "@mui/material/Grid";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BookIcon from "@mui/icons-material/Book";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CopyAllIcon from '@mui/icons-material/CopyAll';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function TopBarClient() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isAuth = "true" === sessionStorage.getItem("isAuth");

  const clickStoreHandler = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }

    if (location.pathname.includes('admin')) {
      window.location.href = "/"
    }
    
    setTimeout(() => {
      handleDrawerClose();
      document.querySelector("#store").scrollIntoView({
        behavior: "smooth",
      });
      
    }, 1000)
  };

  const isAdmin = location.pathname.includes("admin");

  const clickMenuHandler = (menuItem) => {
    handleDrawerClose();

    switch(menuItem) {
      case "createProduct":
        return navigate('/admin/page/product');
      case "allProducts":
        return navigate('/admin/page/products');
      case "createGroup":
        return navigate('/admin/page/group');
      case "allGroups":
        return navigate('/admin/page/groups');
      case "replicate":
        return navigate('/admin/page/replicator');
      case "blog":
        if (isAdmin) {
          return window.location.href = "/blog"
        } else {
          return navigate('blog');
        }
      case "createRecord":
        return navigate('/admin/page/record');
      case "allRecords":
        return navigate('/admin/page/records');
    }
  }

  window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <a
              className="french-font"
              href="/"
              style={{
                color: "white",
                fontSize: "30px",
                textDecoration: "none",
              }}
            >
              Felted Fluffies
            </a>
          </Typography>
          <a
            href="https://www.instagram.com/felted_fluffies__/"
            target="_blank"
            style={{
              color: "white",
              justifyContent: "flex-end",
              display: "flex",
              flex: 1,
              marginRight: "16px",
            }}
          >
            <InstagramIcon sx={{ fontSize: 30 }} />
          </a>
          <a
            justify="flex-end"
            // href="https://www.facebook.com/people/Felted-fluffies/100088276245841/"
            href={!!window.mobileCheck() ? "fb://profile/100088276245841" : "https://www.facebook.com/people/Felted-fluffies/100088276245841/"}
            target="_blank"
            style={{
              color: "white",
              justifyContent: "flex-end",
              display: "flex",
              flex: 0,
            }}
          >
            <FacebookIcon sx={{ fontSize: 30 }} />
          </a>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {isAuth && !isAdmin && (
            <Link href="/admin/page/product" underline="none" color="black">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon
                      sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Адмін панель"} />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
          {isAuth && isAdmin && (
            <Link href="/logout" underline="none" color="black">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon
                      sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Логаут"} />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
          {!isAuth && (
            <Link href="/login" underline="none" color="black">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon
                      sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Логін"} />
                </ListItemButton>
              </ListItem>
            </Link>
          )}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding onClick={clickStoreHandler}>
            <ListItemButton>
              <ListItemIcon>
                <StorefrontIcon
                  sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText primary={"Магазин"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => clickMenuHandler('blog')}>
            <ListItemButton>
              <ListItemIcon>
                <BookIcon
                  sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText primary={"Корисна інформація"} />
            </ListItemButton>
          </ListItem>
        </List>
        {isAdmin && (
          <>
            <Divider />
            <List>
              <ListItem disablePadding onClick={() => clickMenuHandler('createProduct')}>
                <ListItemButton>
                  <ListItemIcon>
                    <AddCircleOutlineIcon
                      sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Створити продукт"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => clickMenuHandler('allProducts')}>
                <ListItemButton>
                  <ListItemIcon>
                    <FormatListBulletedIcon
                      sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Всі продукти"} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding onClick={() => clickMenuHandler('createGroup')}>
                <ListItemButton>
                  <ListItemIcon>
                    <AddCircleOutlineIcon
                      sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Додати групу"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => clickMenuHandler('allGroups')}>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountTreeIcon
                      sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Всі групи"} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding onClick={() => clickMenuHandler('createRecord')}>
                <ListItemButton>
                  <ListItemIcon>
                    <AddCircleOutlineIcon
                      sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Створити запис"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => clickMenuHandler('allRecords')}>
                <ListItemButton>
                  <ListItemIcon>
                    <BookIcon
                      sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Всі записи"} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding onClick={() => clickMenuHandler('replicate')}>
                <ListItemButton>
                  <ListItemIcon>
                    <CopyAllIcon
                      sx={{ fontSize: 30, display: "inline-block", mr: "24px" }}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Реплікація"} />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
      </Drawer>
      <DrawerHeader />
    </>
  );
}
