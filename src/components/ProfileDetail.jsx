import { useNavigate, useParams } from "react-router"
import { useProfileContext } from "../context/ProfileContext";

const ProfileDetail = () => {
  const { id } = useParams();
  const { profiles } = useProfileContext();
  const navigate = useNavigate();
  const profile = profiles.find(profile => profile.id === id)

  return (
    <>
      {
        profile
        ?
          <div>
            <img src={avatar} alt="avatar" />
            <h2>{name}</h2>
            <p>Teléfono: {phone}</p>
            <p>Sexo: {sex}</p>
            <p>Fecha de Nacimiento: {birthday}</p>
            <p>E-Mail: {email}</p>
            <p>Dirección: {address}</p>

            <button onClick={ navigate(-1) }>
              Regresar
            </button>
          </div>
        :
          <h1>Profile not found</h1>
      }
      
    </>
  )
}

export default ProfileDetail