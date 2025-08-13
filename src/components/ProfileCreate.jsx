import { useState } from "react"
import { useProfileContext } from "../context/ProfileContext"
import { useNavigate } from "react-router-dom"

const ProfileCreate = () => {
  const [ profileName, setProfileName ] = useState()
  const [ profileAvatar, setProfileAvatar ] = useState()
  const [ error, setError ] = useState(null)
  const { addProfile } = useProfileContext();
  const navigate = useNavigate();

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
        <h2>Crear nuevo perfil</h2>

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
            Crear Perfil
          </button>
      </div>
    </div>
      
    </>
  )
}

export default ProfileCreate