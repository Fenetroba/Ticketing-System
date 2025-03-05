import React, { useState } from "react";
import "./Css/login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/Store/UserAuth";
import toast from "react-hot-toast";
import Loder from "../../component/loder/Loder";

const Login = () => {
  const { loading } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(login)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Successfully logged in");
      } else {
        toast.error(data.payload.message || "Login failed");
      }
      setLogin({ email: "", password: "" });
    });
  };

  return (
    <div className="login_top">
      <div className="login_container">
        <h2>Login Here</h2>
        <form onSubmit={submitHandler} className="login_form">
          <label htmlFor="email">Email</label> 
          <input
            type="email"
            placeholder="Fenet@gmail.com"
            id="email"
            required
            value={login.email} 
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <label htmlFor="password">Password</label> 
          <input
            type="password"
            placeholder="..........."
            id="password"
            required
            value={login.password} 
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <button className="Loedbtn" type="submit">
            {loading ? <Loder /> : "Login"}
          </button>
        </form>
        <div className="directLogiOrSign">
          {!loading && (
            <span>
              I Am Not A Member? <Link to="/signup">Sign Up</Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;