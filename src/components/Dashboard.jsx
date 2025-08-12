import { Link, Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Link to='users'>Users</Link>
        <Link to='settings'>Settings</Link>
      </div>

      <Outlet/> {/* Aquí se muestran hijos */}
    </div>
  )
}

export default Dashboard