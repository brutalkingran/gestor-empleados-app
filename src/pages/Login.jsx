import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function Login() {
  const { login } = useAuthContext();
  const { isLoggedIn } = useAuthContext()
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de continuar.",
      });
      return;
    }

    try {
      login(data.email, data.password)
    } catch (error) {
      Swal.fire({
        icon: "Error",
        title: "Error de Ingreso",
        timer: 1500,
        showConfirmButton: false,
      });
    } finally {
      Swal.fire({
        icon: "success",
        title: "Login correcto",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/employees-dashboard");
    }
  };

  return (
    <>
    {
      loggedIn
      ? <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">Ya estás logeado</div>
      :
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="e-Mail"
            {...register("email", { required: true })}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">El e-Mail es obligatorio</span>
          )}

          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">La contraseña es obligatoria</span>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Ingresar
          </button>
        </form>
      </div>
    }
    </>
  );
}
