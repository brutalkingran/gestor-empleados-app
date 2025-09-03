import { Routes, Route, Navigate } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import ForbiddenPage from "../pages/ForbiddenPage";
import { PrivateRoutes, AdminRoutes } from "./PrivateRoutes";
import Profiles from "../components/Profiles";
import Employees from "../components/Employees";
import EmployeeDetail from "../components/EmployeeDetail";
import { EmployeeCreate } from "../components/EmployeeCreate";
import EmployeeDelete from "../components/EmployeeDelete";
import ProfileDetail from "../components/ProfileDetail";
import ProfileCreate from "../components/ProfileCreate";
import ProfileUpdate from "../components/ProfileUpdate";
import { EmployeeUpdate } from "../components/EmployeeUpdate";

const AppRouter = () => {
  return (
    <Routes>
  <Route path="/" element={<MainLayout />}>
    {/* Main Routes */}
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />

    {/* Redirects */}
    <Route path="not-found" element={<NotFound />} />
    <Route path="forbidden" element={<ForbiddenPage />} />
    <Route path="*" element={<Navigate to="/not-found" replace />} />

    {/* PRIVATE ROUTES */}
    <Route element={<PrivateRoutes />}>
      {/* Rutas accesibles a todos los logueados */}
      <Route path="employees-dashboard" element={<Employees />} />

      {/* RUTAS SOLO ADMIN */}
      <Route element={<AdminRoutes />}>
        {/* Employee dashboard */}
        <Route path="employee-create" element={<EmployeeCreate />} />
        <Route path="employee/:id" element={<EmployeeDetail />} />
        <Route path="employee/:id/edit" element={<EmployeeUpdate />} />
        <Route path="employee/:id/delete" element={<EmployeeDelete />} />

        {/* Profiles */}
        <Route path="profiles-dashboard" element={<Profiles />} />
        <Route path="profile-create" element={<ProfileCreate />} />
        <Route path="profile/:id" element={<ProfileDetail />} />
        <Route path="profile/:id/edit" element={<ProfileUpdate />} />
      </Route>
    </Route>
  </Route>
</Routes>
  );
};

export default AppRouter;
