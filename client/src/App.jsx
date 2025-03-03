import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AuthLayer from "./page/AuthLayer";
import Login from "./page/Auth/Login";
import Signin from "./page/Auth/Signin";
import UserLAyer from "./page/UserLayer";
import Home from "./page/Users/Home";
import Nofound from "./page/No found/Nofound";
import AdminLayer from "./page/AdminLayer";
import DashboardAdmin from "./page/Admin/DashboardAdmin";
import CheckAuth from "./component/Authnticatin_checker/CheckAuth";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {CheckAuths} from './app/Store/UserAuth'
function App() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(CheckAuths());
  }, [dispatch]);

  console.log(loading, user, isAuthenticated, location.pathname);

  if (!location.pathname.startsWith("/auth") && loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuth={isAuthenticated} user={user}>
              <AuthLayer />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signin />} />
        </Route>

        <Route
          path="/user"
          element={
            <CheckAuth isAuth={isAuthenticated} user={user}>
              <UserLAyer />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home/>} />
        
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuth={isAuthenticated} user={user}>
              <AdminLayer />
            </CheckAuth>
          }
        >
          <Route path="admin_dashboard" element={<DashboardAdmin />} />
    
        </Route>

        <Route path="*" element={<Nofound />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
