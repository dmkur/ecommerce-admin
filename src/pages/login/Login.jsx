import "./Login.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { currentUser, error, isFetching } = useSelector(
    (state) => state.authReducer,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(authActions.login({ email, password }));
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  if (isFetching) {
    return <h1 className="loading">Loading...</h1>;
  }

  return (
    <div className="inputWrapper">
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div style={{ color: "red" }}>{error.message}</div>}
      <button onClick={handleClick}>Login</button>
    </div>
  );
};

export { Login };
