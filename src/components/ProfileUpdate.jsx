import { useNavigate, useParams } from "react-router"
import { useProfileContext } from "../context/ProfileContext";
import { useEffect, useState } from "react";

const ProfileUpdate = () => {
  const [ profileName, setProfileName ] = useState()
  const [ profileAvatar, setProfileAvatar ] = useState()
  const [ error, setError ] = useState(null)

  const { id } = useParams();
  const { profile, editProfile } = useProfileContext();
  const navigate = useNavigate();

  // Cargar datos perfil existente

  useEffect(() => {
    first
  
    return () => {
      second
    }
  }, [third])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validación simple
    if (!profileName || !profileAvatar) {
      setError('Completa todos los campos');
      return
    }

    // Llamada a API
    try {
      addProfile({ profileName, profileAvatar })
      navigate('profile-selector');
    } catch (error) {
      setError('Problema creando perfil. Inténtelo de nuevo más tarde.')
    } finally {
      // Limpiar campos
      setProfileName('');
      setProfileAvatar('');
    }
  }

  return (
    <>
      <div>
        <div>
          <h2>Actualizar perfil</h2>

          {error && <p>{error}</p> }

          <form onSubmit={ handleSubmit }></form>
            <input
              type="text"
              placeholder="Nombre de Perfil"
              value={ profileName }
              onChange={ (e) => setProfileName( e.target.value ) }
            />

            <input
              type="text"
              placeholder="URL del Avatar"
              value={ profileAvatar }
              onChange={ (e) => setProfileAvatar( e.target.value ) }
            />

            <button type="submit">
              Actualizar Perfil
            </button>
        </div>
      </div>
    </>
  )
}

export default ProfileUpdate