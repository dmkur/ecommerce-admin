import "./App.css";
import {Sidebar, Topbar} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
          </div>
        </>
      </Switch>
    </Router>
  );
};

export { App };
