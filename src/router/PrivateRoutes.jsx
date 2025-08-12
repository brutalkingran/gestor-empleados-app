import { Routes, Route } from "react-router";
import Dashboard from "../components/Dashboard";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/employees-dashboard" element={<Dashboard type={"employee"}/>} >
        <Route path='employees' element={<h1>Users</h1>}/>
        <Route path='settings' element={<h1>Settings</h1>}/>
      </Route>
    </Routes>
  )
}

export default PrivateRoutes