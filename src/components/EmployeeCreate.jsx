import { useForm } from "react-hook-form";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function EmployeeCreate() {
  const { addEmployee } = useEmployeeContext();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hireDate: today,
      isActive: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      await addEmployee({
        ...data,
        rank: Number(data.rank), // Convertir a número
        isActive: data.isActive || false,
      });

      Swal.fire({
        icon: "success",
        title: "Empleado creado",
        text: "El nuevo empleado fue añadido correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/employees-dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: "Hubo un problema creando el empleado. Inténtalo más tarde.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
        Añadir nuevo empleado
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del empleado"
          {...register("firstName", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
        {errors.employeeName && <span className="text-red-500 text-sm">Nombre obligatorio</span>}

        <input
          type="text"
          placeholder="Apellido del empleado"
          {...register("lastName", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
        {errors.employeeName && <span className="text-red-500 text-sm">Nombre obligatorio</span>}

        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
        {errors.employeeEmail && <span className="text-red-500 text-sm">Correo obligatorio</span>}

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
        {errors.positionName && <span className="text-red-500 text-sm">Puesto obligatorio</span>}

        <select
          {...register("rank", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>Selecciona un rango</option>
          <option value={0}>Trainee</option>
          <option value={1}>Junior</option>
          <option value={2}>Semi-Senior</option>
          <option value={3}>Mid</option>
          <option value={4}>Senior</option>
          <option value={5}>Lead</option>
          <option value={6}>Manager</option>
        </select>
        {errors.rank && <span className="text-red-500 text-sm">Rango obligatorio</span>}

        <input
          type="text"
          placeholder="Departamento"
          {...register("department", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
        {errors.department && <span className="text-red-500 text-sm">Departamento obligatorio</span>}

        <input
          type="date" value={new Date().toLocaleDateString()}
          {...register("hireDate", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
        {errors.entryDate && <span className="text-red-500 text-sm">Fecha de ingreso obligatoria</span>}

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("isActive")}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-gray-700 cursor-pointer">Activo</span>
        </label>

        <input
          type="number"
          placeholder="Salario"
          {...register("salary", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
        {errors.photo && <span className="text-red-500 text-sm">Salario Obligatorio</span>}

        <input
          type="date"
          {...register("birthday", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
        {errors.entryDate && <span className="text-red-500 text-sm">Fecha de nacimiento obligatorio</span>}

        <select
          {...register("sex", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Seleccionar sexo</option>
          <option value="female">Femenino</option>
          <option value="male">Masculino</option>
        </select>
        {errors.sex && <span className="text-red-500 text-sm">Sexo obligatorio</span>}

        <input
          type="number"
          placeholder="Nivel de estrés (0-100)"
          {...register("stressLevel", { required: true, min: 0, max: 100 })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
        {errors.stressLevel && <span className="text-red-500 text-sm">Nivel de estrés obligatorio</span>}

        <input
          type="text"
          placeholder="URL de la foto"
          {...register("photo", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
        {errors.photo && <span className="text-red-500 text-sm">Foto obligatoria</span>}

        <textarea
          placeholder="Notas"
          {...register("notes", { required: false })}
          className="w-full border rounded px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.notes && <span className="text-red-500 text-sm">Notas obligatorias</span>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Guardar Empleado
        </button>
      </form>
    </div>
  );
}
