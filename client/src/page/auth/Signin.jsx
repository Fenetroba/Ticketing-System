import React, { useState ,useEffect} from "react";
import "./Css/signup.css";
import {signup_LanguageEnglish ,signup_LanguageAmharic,signup_LanguageOromice} from '../../component/config/config.js'
import Loder from "../../component/loder/Loder.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../app/Store/UserAuth.js";
import toast from "react-hot-toast";
const Signup = () => {
  

  const { user, isAuthenticated, loading } = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    UserName: "",
    password: "",
    email: "",
  });
  const Dispatch = useDispatch();
  const submitHundler = (e) => {
    e.preventDefault();
    Dispatch(signupUser(form)).then((data) => {
      if (data?.payload?.success) {
        toast.success("Succsess fully You Rgisterd");
        navigate("/auth/login");
      } else {
        toast.error("some thing is wrong");
      }
    });
  };
  return (
    <div className="signup__top">
      
        <div className="signup_contener">
          <h2>Create An Account</h2>
          <form onSubmit={submitHundler} className="signUp_form">
            <label>Full Name</label>
            <input
              id="name"
              required
              type="text"
              placeholder="fenet roba"
              value={form.name}
              onChange={(e) => setForm({ ...form, UserName: e.target.value })}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Fena@gmail.com"
              id="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="..........."
              id="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button className="Loedbtn">
              {loading ? <Loder /> :"SignUp"}
            </button>
          </form>

          <div className="directLogiOrSign">
            {loading ? (
              ""
            ) : (
              <span>
                Alredy Have an Account ?<Link to="/auth/login">Login Here</Link>
              </span>
            )}
          </div>
        </div>
      
    </div>
  );
};

export default Signup;
