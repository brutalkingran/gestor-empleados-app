import { Routes, Route, Navigate } from "react-router";
import Home from "../components/Home";
import About from "../components/About";
import Dashboard from "../components/Dashboard";
import NotFound from "../components/NotFound";
import Profile from "../components/Profile";
import ProfileSelector from "../components/ProfileSelector";
import Employee from "../components/Employee";
import ProfileDetail from "../components/ProfileDetail";

const AppRouter = () => {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/empleados" element={<h1>Empleados</h1>} />
      <Route path="/About" element={<About/>} />

      {/* Nested User Routes */}
      <Route path="/user-dashboard" element={<Dashboard type={"user"}/>} >
        <Route path='users' element={<h1>Users</h1>}/>
        <Route path='settings' element={<h1>Settings</h1>}/>
      </Route>

      {/* TODO: REMOVER */}
      <Route path="/employees-dashboard" element={<Dashboard type={"employee"}/>} >
        <Route path='employees' element={<h1>Users</h1>}/>
        <Route path='settings' element={<h1>Settings</h1>}/>
      </Route>
      
      {/* Dinamic Routes */}
      <Route path="/profile/:id" element={ <ProfileDetail/> } />
      <Route path="/employee/:id" element={ <Employee/> } />

      <Route path="/profiles" element={ <ProfileSelector/> } />

      {/* Redirects */}
      <Route path="not-found" element={<NotFound/>}/>
      <Route path="*" element={<Navigate to="/not-found" replace />}/>
    </Routes>
  )
}

export default AppRouter;