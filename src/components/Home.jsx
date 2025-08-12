import { Link, useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>

      {/* Componente LINK */}
      <Link to="/about">
        Go to About
      </Link>

      <button onClick={() => navigate('/about')}>
        Navigate to /about
      </button>
      
      <button onClick={() => navigate('/dashboard')}>
        Navigate to /dashboard
      </button>

    </div>
  )
}

export default Home