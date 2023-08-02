import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/user";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import MyProfile from "./components/User/MyProfile";
import LoginRegister from "./components/User/LoginRegister";
import OrganizationPage from "./components/Organization/OrganizationPage";
import RegisterOrganization from "./components/Organization/RegisterOrganization";
import Notice from "./components/Notice/Notice";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated && <Home />}
        />
        <Route 
          path="/login"
          element={isAuthenticated ? <Home /> : <LoginRegister/>}
        />
        <Route 
          path="/register"
          element={isAuthenticated ? <Home /> : <LoginRegister/>}
        />
        <Route path="/users/me" element= {isAuthenticated ? <MyProfile/> : <LoginRegister/> } />
        <Route 
          path={`/organizations/:organizationID`}
          element={isAuthenticated ? <OrganizationPage /> : <LoginRegister/>}
        />
        <Route 
          path="/organizations/register"
          element= <RegisterOrganization />
        />
        <Route 
          path="/organizations/:organizationID/notices/:noticeID"
          element= <Notice />
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
