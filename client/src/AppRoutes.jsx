import * as React from "react";
import Store from "./pages/Store";
import { Router, Route, Routes } from "react-router-dom";
import ProductDetailed from "./pages/ProductDetailed";
import TopBarClient from "./components/TopBarClient";
import Login from "./pages/Login";
import Admin from "./pages/AdminProduct";
import "./index.css";
import sheep from "./recources/sheep.gif";
import Greetings from "./components/Greetings";
import AdminProducts from "./pages/AdminProducts";
import AdminGroups from "./pages/AdminGroups";
import AdminGroup from "./pages/AdminGroup";
import AdminProduct from "./pages/AdminProduct";
import Logout from "./pages/Logout";
import Replicator from "./pages/Replicator";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation } from "react-router-dom";
import Blog from "./components/BlogRecord";
import BlogRecordsList from "./pages/BlogRecordsList";
import AdminRecord from "./pages/AdminRecord";
import AdminRecords from "./pages/AdminRecords";

function AppRoutes(props) {
  const location = useLocation();
  const [initialCards, setInitialCards] = React.useState([]);
  const [initialGroups, setInitialGroups] = React.useState([]);
  const [initialRecords, setInitialRecords] = React.useState([]);

  const fetchCards = async () => {
    const response = await fetch("/products");
    const data = await response.json();

    const sortedData = data.sort(function (a, b) {
      return b.timestamp - a.timestamp;
    });

    setInitialCards(sortedData);
  };

  const fetchGroups = async () => {
    const response = await fetch("/groups");
    const data = await response.json();
    data.groups.sort();
    data.groups.unshift("Всі групи");

    setInitialGroups(data.groups);
  };

  const fetchRecords = async () => {
    const response = await fetch("/records");
    const data = await response.json();

    const sortedData = data.sort(function (a, b) {
      return b.timestamp - a.timestamp;
    });

    setInitialRecords(sortedData);
  };

  React.useEffect(() => {
    fetchCards();
    fetchGroups();
    fetchRecords();
  }, []);

  return (
      // <TransitionGroup component={null}>
      //   <CSSTransition
      //   key={location.key}
      //   timeout={300}
      //   classNames="fade"
      //   onEnter={() => {
      //     console.log('FIRED!');
      // }}
      //   >
          // <Routes location={location}>
          <Routes>
            <Route
              path="/"
              element={<Store cards={initialCards} groups={initialGroups} />}
            />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="products/:productCode" element={<ProductDetailed />} />
            <Route path="blog" element={<BlogRecordsList records={initialRecords}/>} />
            <Route path="admin/page/product" element={<AdminProduct />} />
            <Route path="admin/page/products" element={<AdminProducts />} />
            <Route path="admin/page/group" element={<AdminGroup />} />
            <Route path="admin/page/groups" element={<AdminGroups />} />
            <Route path="admin/page/record" element={<AdminRecord />} />
            <Route path="admin/page/records" element={<AdminRecords />} />
            <Route path="admin/page/replicator" element={<Replicator />} />
            <Route path="*" element={<p>Path not resolved</p>} />
          </Routes>
      //   </CSSTransition>
      // </TransitionGroup>
  );
}

export default AppRoutes;
