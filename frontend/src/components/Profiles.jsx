import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchProfile } from "../services/MockAPI";

const Profile = () => {
  const [userData, setUserData] = useState(null)
  const { id } = useParams(); // Accede a segmentos dinámicos de la URL

  // console.log(useParams()); ej. id: 1

  useEffect(() => {
    setUserData( fetchProfile(id) );
  }, [])
  

  return (
    <div>
      <h1>
        Profile ID: { id || "inválido" }
      </h1>

      <ul>
        {
          !userData
            ? "No encontrado"
            : userData.map( (data, key) =>
              <li key={key}>{ data }</li>
            )
        }
      </ul>
    </div>
  )
}

export default Profile