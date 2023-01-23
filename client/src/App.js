import React from "react";
import Store from "./pages/Store";
import { Router, Route, Routes } from "react-router-dom";
import ProductDetailed from "./pages/ProductDetailed";
import TopBarClient from "./components/TopBarClient";
import Login from "./pages/Login";
import Admin from "./pages/AdminProduct";
import './index.css';
import sheep from './recources/sheep.gif'
import Greetings from "./components/Greetings";
import AdminProducts from "./pages/AdminProducts";
import AdminGroups from "./pages/AdminGroups";
import AdminGroup from "./pages/AdminGroup";
import AdminProduct from "./pages/AdminProduct";
import Logout from "./pages/Logout";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <>
      <TopBarClient />
      {/* <Greetings /> */}
      <AppRoutes />
    </>
  );
}

export default App;
