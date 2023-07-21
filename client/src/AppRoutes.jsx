import * as React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import AdminGroup from "./pages/admin/AdminGroup";
import AdminGroups from "./pages/admin/AdminGroups";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminRecord from "./pages/admin/AdminRecord";
import AdminRecords from "./pages/admin/AdminRecords";
import BlogRecordsList from "./pages/customer/BlogRecordsList";
import Login from "./pages/customer/Login";
import Logout from "./pages/customer/Logout";
import ProductDetailed from "./pages/customer/ProductDetailed";
import Replicator from "./pages/admin/Replicator";
import Store from "./pages/customer/Store";
import TopBarClient from "./components/TopBarClient";
import StepperShoppingCart from "./pages/customer/ShoppingCart/StepperShoppingCart";
import AdminEditProduct from "./pages/admin/AdminEditProduct";

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

    const filteredData = data.filter((group) => group.name !== "Всі групи");
    const allGroupsGroup = data.filter((group) => group.name === "Всі групи");
    filteredData.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }

      if (a.name < b.name) {
        return -1;
      }

      return 0;
    });

    if (Boolean(allGroupsGroup.length)) {
      filteredData.unshift(allGroupsGroup[0]);
    }

    setInitialGroups(filteredData);
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
    <>
      <TopBarClient />
      <Routes>
        <Route
          path="/"
          element={
            <Store
              cards={initialCards}
              groups={initialGroups}
            />
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="products/:productCode" element={<ProductDetailed />} />
        <Route
          path="blog"
          element={<BlogRecordsList records={initialRecords} />}
        />
        <Route
          path="shoppingcart"
          element={
            <StepperShoppingCart />
          }
        />
        <Route path="admin/page/product" element={<AdminProduct />} />
        <Route path="admin/page/editproduct/:productId" element={<AdminEditProduct />} />
        <Route path="admin/page/products" element={<AdminProducts />} />
        <Route path="admin/page/group" element={<AdminGroup />} />
        <Route path="admin/page/groups" element={<AdminGroups />} />
        <Route path="admin/page/record" element={<AdminRecord />} />
        <Route path="admin/page/records" element={<AdminRecords />} />
        <Route path="admin/page/replicator" element={<Replicator />} />
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
