import React from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import mystore from "./redux/store";
import EmployeeHome from "./Screens/Employee/Home";
import ManagerHome from "./Screens/Manager/Home";
import AdminHome from "./Screens/Admin/Home";

const App = () => {
  return (
    <>
      <Provider store={mystore}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="employee" element={<EmployeeHome />} />
            <Route path="manager" element={<ManagerHome />} />
            <Route path="admin" element={<AdminHome />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
