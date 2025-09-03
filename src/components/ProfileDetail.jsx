import { useNavigate, useParams } from "react-router";
import { useProfileContext } from "../context/ProfileContext";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";

const ProfileDetail = () => {
  const { user } = useAuthContext()
  const { id } = useParams();
  const { profiles = [], deleteProfile, editProfile } = useProfileContext(); // asegurar que profiles sea un array
  const navigate = useNavigate();

  // Buscar el perfil (asegurarse de comparar con string si es necesario)
  const profile = profiles.find(profile => String(profile._id) === String(id));

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed && profile) {
      try {
        await deleteProfile(profile._id);
        Swal.fire('Borrado!', 'El perfil ha sido borrado.', 'success');
        navigate(-1); // Volvemos al listado después de borrar
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo borrar el perfil', 'error');
      }
    }
  };

  if (!profile) return <h1>Profile not found</h1>;

  return (
  <>
    {
      user
        ?
        <div className="flex flex-col items-center text-center bg-green-100 p-10 rounded text-green-900 w-80">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-5">
            <img
              src={user.avatar ?? "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt={`Foto de ${user.firstName}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
              }}
            />
          </div>

          <h2 className="font-bold text-2xl mb-3">{user.firstName} {user.lastName}</h2>

          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rango:</strong> {user.rank?.name ?? "-"}</p>
          <p><strong>Debe cambiar contraseña:</strong> {user.mustChangePassword ? "Sí" : "No"}</p>
          <p><strong>Creado:</strong> {new Date(user.createdAt).toLocaleDateString() && "N/A"}</p>
          <p><strong>Actualizado:</strong> {new Date(user.updatedAt).toLocaleDateString() && "N/A"}</p>

          <div className="flex flex-row items-center mt-5">
            <button
              onClick={() => navigate(-1)}
              className="mr-2 px-3 py-1 bg-green-400 text-white rounded hover:bg-green-300 cursor-pointer"
            >
              Regresar
            </button>

            <button
              onClick={() => editProfile(user._id)}
              className="mr-2 px-3 py-1 bg-green-400 text-white rounded hover:bg-green-300 cursor-pointer"
            >
              Editar
            </button>

            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 cursor-pointer"
            >
              Borrar
            </button>
          </div>
        </div>
        :
        <div className="flex flex-col items-center">
          <h1 className="text-neutral-600 italic mb-3">- Usuario no encontrado -</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 bg-green-400 text-white rounded hover:bg-green-300 cursor-pointer"
          >
            Regresar
          </button>
        </div>
    }
  </>
);
};

export default ProfileDetail;
