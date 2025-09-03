import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEmployeeContext } from "../context/EmployeeContext";

export const EmployeeUpdate = () => {
  const { id } = useParams();
  const { employees, editEmployee, fetchRanks, fetchDepartments, ranks, departments } = useEmployeeContext();
  const navigate = useNavigate();

  const employee = employees.find((e) => String(e._id) === String(id));

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    fetchRanks();
    fetchDepartments();
  }, []); 

  // Inicializar los valores del formulario siguiendo el schema exacto
  useEffect(() => {
    if (employee) {
      setValue("firstName", employee.firstName || "");
      setValue("lastName", employee.lastName || "");
      setValue("email", employee.email || "");
      setValue("phoneNumber", employee.phoneNumber || "");
      setValue("position", employee.position || "");
      setValue("rank", employee.rank?._id || "");
      setValue("department", employee.department?._id || "");
      setValue("hireDate", employee.hireDate ? new Date(employee.hireDate).toISOString().slice(0, 10) : "");
      setValue("isActive", employee.isActive || false);
      setValue("salary", employee.salary || "");
      setValue("birthday", employee.birthday ? new Date(employee.birthday).toISOString().slice(0, 10) : "");
      setValue("sex", employee.sex || "");
      setValue("stressLevel", employee.stressLevel || 0);
      setValue("photo", employee.photo || "");
      setValue("notes", employee.notes || "");
    }
  }, [employee, setValue]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      
      await editEmployee(id, data);

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

  if (!employee) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-neutral-600 italic mb-3">- Empleado no encontrado -</h1>
        <button
          onClick={() => navigate(-1)}
          className="mr-2 px-2 py-1 bg-blue-400 text-white rounded hover:bg-blue-300 cursor-pointer"
        >
          Regresar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
        Actualizar Empleado
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
          placeholder="Teléfono"
          {...register("phoneNumber")}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Cargo / Puesto"
          {...register("position")}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <select
          {...register("rank", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
          defaultValue={employee.rank?._id || ""}
        >
          <option value="" disabled>Selecciona un rango</option>
          {ranks.map((r) => (
            <option key={r._id} value={r._id}>{r.name}</option>
          ))}
        </select>
        {errors.rank && <span className="text-red-500 text-sm">Rango obligatorio</span>}

        <select
          {...register("department", { required: true })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
          defaultValue={employee.department?._id || ""}
        >
          <option value="" disabled>Selecciona un departamento</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>
        {errors.department && <span className="text-red-500 text-sm">Departamento obligatorio</span>}

        <input
          type="date"
          placeholder="Fecha de ingreso"
          {...register("hireDate")}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

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
          {...register("salary")}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="date"
          placeholder="Cumpleaños"
          {...register("birthday")}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Sexo"
          {...register("sex")}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Nivel de estrés"
          {...register("stressLevel")}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Foto (URL)"
          {...register("photo")}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Notas"
          {...register("notes")}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Actualizar Empleado
        </button>
      </form>
    </div>
  );
}
