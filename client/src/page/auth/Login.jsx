import React, { useState } from "react";
import "./Css/login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/Store/UserAuth";
import toast from "react-hot-toast";
import Loder from "../../component/loder/Loder";

const Login = () => {
  const { loading } = useSelector((state) => state.Auth);
  const dispatch = useDispatch(); // Corrected variable name from Dispatch to dispatch
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
      setLogin({ email: "", password: "" }); // Reset login state correctly
    });
  };

  return (
    <div className="login_top">
      <div className="login_container"> {/* Corrected the spelling from 'contenere' to 'container' */}
        <h1>Login Here</h1>
        <form onSubmit={submitHandler} className="login_form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Fenet@gmail.com"
            id="email"
            required
            onChange={(e) => setLogin({ ...login, email: e.target.value })} // Use lowercase 'login'
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="..........."
            id="password"
            required
            onChange={(e) => setLogin({ ...login, password: e.target.value })} // Use lowercase 'login'
          />
          <button className="Loedbtn" type="submit"> {/* Added type="submit" */}
            {loading ? <Loder /> : "Login"} {/* Changed Login to "Login" */}
          </button>
        </form>
        <div className="directLogiOrSign">
          {!loading && (
            <span>
              I Am Not A Member? <Link to="/auth/signup">Sign Up</Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;