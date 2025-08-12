import { useNavigate } from "react-router"

const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>About</h1>
      
      <button onClick={() => navigate(-1)}>
        -1 Go Back
      </button>
    </div>
  )
}

export default About