import { useNavigate, useParams } from "react-router";
import { useProfileContext } from "../context/ProfileContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function ProfileUpdate() {
  const { id } = useParams();
  const { profiles, editProfile } = useProfileContext();
  const navigate = useNavigate();

  const profile = profiles.find((p) => String(p._id) === String(id));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Inicializar los valores del formulario
  useEffect(() => {
    if (profile) {
      setValue("firstName", profile.firstName || "");
      setValue("lastName", profile.lastName || "");
      setValue("username", profile.username || "");
      setValue("email", profile.email || "");
      setValue("rank", profile.rank?._id || "");
      setValue("mustChangePassword", profile.mustChangePassword || false);
      setValue("isDeleted", profile.isDeleted || false);
    }
  }, [profile, setValue]);

  const onSubmit = async (data) => {
    try {
      await editProfile(id, {
        ...data,
        rank: data.rank, // si tu backend requiere ObjectId string
        mustChangePassword: data.mustChangePassword || false,
        isDeleted: data.isDeleted || false,
      });

      Swal.fire({
        icon: "success",
        title: "Perfil actualizado",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/profiles-dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: error.message || "Hubo un problema al actualizar el perfil.",
      });
    }
  };

  return (
    <>
      {profile ? (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Actualizar perfil
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              {...register("firstName", { required: true })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            {errors.firstName && <span className="text-red-500 text-sm">Nombre obligatorio</span>}

            <input
              type="text"
              placeholder="Apellido"
              {...register("lastName", { required: true })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            {errors.lastName && <span className="text-red-500 text-sm">Apellido obligatorio</span>}

            <input
              type="text"
              placeholder="Usuario"
              {...register("username", { required: true })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && <span className="text-red-500 text-sm">Usuario obligatorio</span>}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <span className="text-red-500 text-sm">Correo obligatorio</span>}

            <select
              {...register("rank", { required: true })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Selecciona un rango
              </option>
              {[0, 1, 2, 3, 4, 5, 6].map((r) => (
                <option key={r} value={r}>
                  {["Trainee", "Junior", "Semi-Senior", "Mid", "Senior", "Lead", "Manager"][r]}
                </option>
              ))}
            </select>
            {errors.rank && <span className="text-red-500 text-sm">Rango obligatorio</span>}

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("mustChangePassword")}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-gray-700 cursor-pointer">Debe cambiar contraseña</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("isDeleted")}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-gray-700 cursor-pointer">Usuario Eliminado</span>
            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Actualizar Perfil
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-neutral-600 italic mb-3">- Perfil no encontrado -</h1>
          <button
            onClick={() => navigate(-1)}
            className="mr-2 px-2 py-1 bg-blue-400 text-white rounded hover:bg-blue-300 cursor-pointer"
          >
            Regresar
          </button>
        </div>
      )}
    </>
  );
}
