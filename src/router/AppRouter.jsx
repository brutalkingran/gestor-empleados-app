import { Routes, Route, Navigate } from "react-router";
import Home from "../components/Home";
import About from "../components/About";
import Dashboard from "../components/Dashboard";
import NotFound from "../components/NotFound";
import Profile from "../components/Profile";
import ProfileSelector from "../components/ProfileSelector";
import Employee from "../components/Employee";
import ProfileDetail from "../components/ProfileDetail";
import ProfileCreate from "../components/ProfileCreate";
import ProfileUpdate from "../components/ProfileUpdate";

const AppRouter = () => {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/About" element={<About/>} />

      {/* Nested User Routes */}
      <Route path="/user-dashboard" element={<Dashboard type={"user"}/>} >
        <Route path='users' element={<h1>Users</h1>}/>
        <Route path='settings' element={<h1>Settings</h1>}/>
      </Route>

      {/* Employees routes */}
      <Route path="/employees-dashboard" element={<Employee/>} >
        <Route path='employees' element={<h1>Users</h1>}/>
        <Route path='settings' element={<h1>Settings</h1>}/>
      </Route>
      <Route path="/employee-create/" element={ <EmployeeCreate/> } />
      <Route path="/employee/:id" element={ <EmployeeDetail/> } />
      <Route path="/employee/:id/edit" element={ <EmployeeUpdate/> } />

      {/* Profile routes */}
        {/* Dinamic Routes */}
      <Route path="/profile-create/" element={ <ProfileCreate/> } />
      <Route path="/profile/:id" element={ <ProfileDetail/> } />
      <Route path="/profile/:id/edit" element={ <ProfileUpdate/> } />
      <Route path="/profiles" element={ <ProfileSelector/> } />

      {/* Redirects */}
      <Route path="not-found" element={<NotFound/>}/>
      <Route path="*" element={<Navigate to="/not-found" replace />}/>
    </Routes>
  )
}

export default AppRouter;