import { useNavigate, useParams } from "react-router"
import { useProfileContext } from "../context/ProfileContext";
import { useEffect, useState } from "react";

const ProfileUpdate = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState(null)

  const { id } = useParams();
  const { profiles, editProfile } = useProfileContext();
  const navigate = useNavigate();

  useEffect(() => {
    const currentProfile = profiles.find(p => p._id === id);

    if (currentProfile) {
      setFirstName(currentProfile.firstName);
      setLastName(currentProfile.lastName);
    } else {
      setError("Perfil no encontrado");
    }
  }, [id, profiles])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!firstName || !lastName) {
      setError('Completa todos los campos');
      return
    }

    try {
      await editProfile(id, { firstName, lastName })
      navigate('/profile-selector');
    } catch (error) {
      setError('Problema actualizando perfil. Inténtelo de nuevo más tarde.')
    }
  }

  return (
    <div>
      <h2>Actualizar perfil</h2>
      {error && <p>{error}</p> }

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">
          Actualizar Perfil
        </button>
      </form>
    </div>
  )
}

export default ProfileUpdate
