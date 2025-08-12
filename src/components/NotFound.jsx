import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 not found</h1>
    </div>
  )
}

export default NotFound;