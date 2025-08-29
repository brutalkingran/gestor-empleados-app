import { Routes, Route, Navigate } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Dashboard from "../components/Dashboard";
import Profiles from "../components/Profiles";
import ProfileSelector from "../components/ProfileSelector";
import Employees from "../components/Employees";
import EmployeeDetail from "../components/EmployeeDetail";
import EmployeeCreate from "../components/EmployeeCreate";
import EmployeeUpdate from "../components/EmployeeUpdate";
import EmployeeDelete from "../components/EmployeeDelete";
import ProfileDetail from "../components/ProfileDetail";
import ProfileCreate from "../components/ProfileCreate";
import ProfileUpdate from "../components/ProfileUpdate";
import MainLayout from "../layouts/MainLayout";
import Contact from "../pages/Contact";
import MyProfile from "../pages/MyProfile";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        {/* Main Routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/my-profile" element={<MyProfile/>} />

        {/* Nested User Routes */}
        <Route path="/user-dashboard" element={<Dashboard type={"user"}/>} >
          <Route path='users' element={<h1>Users</h1>}/>
          <Route path='settings' element={<h1>Settings</h1>}/>
        </Route>

        {/* Employees routes */}
        <Route path="/employees-dashboard/:page" element={<Employees/>} >
          <Route path='employees' element={<h1>Users</h1>}/>
          <Route path='settings' element={<h1>Settings</h1>}/>
        </Route>
        <Route path="/employee-create/" element={ <EmployeeCreate/> } />
        <Route path="/employee/:id" element={ <EmployeeDetail/> } />
        <Route path="/employee/:id/edit" element={ <EmployeeUpdate/> } />
        <Route path="/employee/:id/delete" element={ <EmployeeDelete/> } />

        {/* Profile routes */}
          {/* Dinamic Routes */}
        <Route path="/profile-create/" element={ <ProfileCreate/> } />
        <Route path="/profile/:id" element={ <ProfileDetail/> } />
        <Route path="/profile/:id/edit" element={ <ProfileUpdate/> } />
        <Route path="/profiles" element={ <ProfileSelector/> } />
        <Route path="/profiles-dashboard" element={ <Profiles/> } />

        {/* Redirects */}
        <Route path="not-found" element={<NotFound/>}/>
        <Route path="*" element={<Navigate to="/not-found" replace />}/>
      </Route>
    </Routes>
  )
}

export default AppRouter;