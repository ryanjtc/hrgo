import React from "react";
import './App.scss';
import Header from "./components/header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Dash from "./pages/Dash";
import PageNotFound from "./pages/PageNotFound";
import AddProfile from "./components/dash/AddProfile/AddProfile";
import AddEmployee from "./components/dash/AddEmployee/AddEmployee";
import EmployeeList from "./components/dash/EmployeeList/EmployeeList";
import EditProfile from "./components/dash/EditProfile/EditProfile";
import UpdateForm from "./components/dash/Updates/UpdateForm";
import TaskDisplay from "./components/dash/Tasks/TaskDisplay";
import Schedule from "./pages/Schedule";
import Payments from "./components/Payments/Payments";



function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={'/'} element={<Home /> }></Route>
                    <Route path={'/dash'} element={<Dash /> }></Route>
                    <Route path={'/addProfile'} element={<AddProfile /> }></Route>
                    <Route path={'/addEmployee'} element={<AddEmployee /> }></Route>
                    <Route path={'/employeeList'} element={<EmployeeList /> }></Route>
                    <Route path={'/editProfile'} element={<EditProfile /> }></Route>
                    <Route path={'/tasks'} element={<TaskDisplay/>  }></Route>
                    <Route path={'/schedule'} element={<Schedule/>  }></Route>
                    <Route path={'/payments'} element={<Payments/>  }></Route>
                    <Route path={'/updateForm'} element={<UpdateForm /> }></Route>
                    <Route path={'*'} element={<PageNotFound /> }></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
