import { Routes, Route, Navigate } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import ForbiddenPage from "../pages/ForbiddenPage";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../components/Dashboard";
import Profiles from "../components/Profiles";
import Employees from "../components/Employees";
import EmployeeDetail from "../components/EmployeeDetail";
import EmployeeCreate from "../components/EmployeeCreate";
import EmployeeUpdate from "../components/EmployeeUpdate";
import EmployeeDelete from "../components/EmployeeDelete";
import ProfileDetail from "../components/ProfileDetail";
import ProfileCreate from "../components/ProfileCreate";
import ProfileUpdate from "../components/ProfileUpdate";
import MyProfile from "../pages/MyProfile";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        {/* Main Routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />

        {/* Redirects */}
        <Route path="not-found" element={<NotFound/>}/>
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />}/>
      </Route>

      {/* PRIVATE ROUTES */}
      <Route 
        path="/employee-dashboard" 
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        } 
      />

      <Route 
        path="/user-dashboard" 
        element={
          <PrivateRoutes>
            <Dashboard type="user" />
          </PrivateRoutes>
        }
      >
        <Route path="users" element={<h1>Users</h1>} />
        <Route path="settings" element={<h1>Settings</h1>} />
      </Route>

      <Route 
        path="/my-profile" 
        element={
          <PrivateRoutes>
            <MyProfile />
          </PrivateRoutes>
        } 
      />

      <Route 
        path="/employees-dashboard" 
        element={
          <PrivateRoutes>
            <Employees />
          </PrivateRoutes>
        }
      >
        <Route path="employees" element={<h1>Users</h1>} />
        <Route path="settings" element={<h1>Settings</h1>} />
      </Route>

      <Route 
        path="/employee-create" 
        element={
          <PrivateRoutes>
            <EmployeeCreate />
          </PrivateRoutes>
        } 
      />
      <Route 
        path="/employee/:id" 
        element={
          <PrivateRoutes>
            <EmployeeDetail />
          </PrivateRoutes>
        } 
      />
      <Route 
        path="/employee/:id/edit" 
        element={
          <PrivateRoutes>
            <EmployeeUpdate />
          </PrivateRoutes>
        } 
      />
      <Route 
        path="/employee/:id/delete" 
        element={
          <PrivateRoutes>
            <EmployeeDelete />
          </PrivateRoutes>
        } 
      />

      <Route 
        path="/profile-create" 
        element={
          <PrivateRoutes>
            <ProfileCreate />
          </PrivateRoutes>
        } 
      />
      <Route 
        path="/profile/:id" 
        element={
          <PrivateRoutes>
            <ProfileDetail />
          </PrivateRoutes>
        } 
      />
      <Route 
        path="/profile/:id/edit" 
        element={
          <PrivateRoutes>
            <ProfileUpdate />
          </PrivateRoutes>
        } 
      />
      <Route 
        path="/profiles-dashboard" 
        element={
          <PrivateRoutes>
            <Profiles />
          </PrivateRoutes>
        } 
      />
    </Routes>
  );
};

export default AppRouter;
