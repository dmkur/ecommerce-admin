import { Route, Routes, Navigate } from "react-router-dom";
import {
  Login,
  Home,
  NewProduct,
  Product,
  ProductList,
  NewUser,
  User,
  UserList,
} from "./pages";
import { MainLayout } from "./layouts/MainLayout";

const App = () => {
  return (
    <Routes>
      <Route path="" element={<MainLayout />}>
        <Route index element={<Navigate to={"/home"} />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/users"} element={<UserList />} />
        <Route path={"/user/:userId"} element={<User />} />
        <Route path={"/newUser"} element={<NewUser />} />
        <Route path={"/products"} element={<ProductList />} />
        <Route path={"/product/:productId"} element={<Product />} />
        <Route path={"newproduct"} element={<NewProduct />} />
      </Route>
      <Route path={"/login"} element={<Login />} />
    </Routes>
  );
};

export { App };
