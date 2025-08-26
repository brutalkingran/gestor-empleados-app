import { useNavigate, useParams } from "react-router"
import { useProfileContext } from "../context/ProfileContext";

const ProfileDetail = () => {
  const { id } = useParams();
  const { profiles, deleteProfile } = useProfileContext();
  const navigate = useNavigate();
  const profile = profiles.find(profile => profile.id === id)

  const handleDelete = async () => {
    const confirm = window.confirm(`¿Estás seguro que quieres borrar este perfil?`);

    if ( confirm ) {
      try {
        await deleteProfile( profile.id );
      } catch(error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      {
        profile ?
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

            <button onClick={ navigate(`/profiles/${id}/edit`)}>
              Editar
            </button>

            <button onClick={handleDelete}>
              Borrar
            </button>
          </div>
        :
          <h1>Profile not found</h1>
      }
      
    </>
  )
}

export default ProfileDetail