import { useNavigate, useParams } from "react-router";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function EmployeeUpdate() {
  const { id } = useParams();
  const { employees, editEmployee } = useEmployeeContext();
  const navigate = useNavigate();

  const employee = employees.find((emp) => String(emp._id) === String(id));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Inicializar los valores del formulario
  useEffect(() => {
    if (employee) {
      setValue("firstName", employee.firstName || "");
      setValue("lastName", employee.lastName || "");
      setValue("email", employee.email || "");
      setValue("phoneNumber", employee.phoneNumber || "");
      setValue("position", employee.position || "");
      setValue("rank", employee.rank?._id || "");
      setValue("department", employee.department?._id || "");
      setValue("hireDate", employee.hireDate ? employee.hireDate.split("T")[0] : "");
      setValue("photo", employee.photo || "");
      setValue("notes", employee.notes || "");
      setValue("isActive", employee.isActive || false);
      setValue("sex", employee.sex || "");
      setValue("birthday", employee.birthday ? employee.birthday.split("T")[0] : "");
      setValue("stressLevel", employee.stressLevel || "");
      setValue("salary", employee.salary || "");
    }
  }, [employee, setValue]);

  const onSubmit = async (data) => {
    try {
      await editEmployee(id, {
        ...data,
        rank: Number(data.rank),
        isActive: data.isActive || false,
      });

      Swal.fire({
        icon: "success",
        title: "Empleado actualizado",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/employees-dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: error.message || "Hubo un problema al actualizar el empleado.",
      });
    }
  };

  return (
    <>
      {employee ? (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Actualizar empleado
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
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <span className="text-red-500 text-sm">Correo obligatorio</span>}

            <input
              type="text"
              placeholder="Número de teléfono"
              {...register("phoneNumber", { required: true })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            {errors.phoneNumber && <span className="text-red-500 text-sm">Teléfono obligatorio</span>}

            <input
              type="text"
              placeholder="Puesto"
              {...register("position", { required: true })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            {errors.position && <span className="text-red-500 text-sm">Puesto obligatorio</span>}

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

            <input
              type="date"
              {...register("hireDate", { required: true })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            {errors.hireDate && <span className="text-red-500 text-sm">Fecha de ingreso obligatoria</span>}

            <input
              type="text"
              placeholder="URL de la foto"
              {...register("photo")}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              placeholder="Notas"
              {...register("notes")}
              className="w-full border rounded px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("isActive")}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-gray-700 cursor-pointer">Activo</span>
            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Actualizar Empleado
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-neutral-600 italic mb-3">- Empleado no encontrado -</h1>
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
