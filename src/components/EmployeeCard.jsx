import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const EmployeeCard = ({
  EmployeeName,
  photo,
  positionName,
  rank,
  department,
  email,
  isActive,
  sex,
  notes,
  onClickDetails,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <div
      onClick={onClickDetails}
      className={`grid grid-cols-1 md:grid-cols-7 gap-4 p-4 rounded-lg shadow-md transition cursor-pointer 
        ${isActive 
          ? "bg-white dark:bg-indigo-300" 
          : "bg-red-100 border border-red-300 dark:border-indigo-700 dark:bg-indigo-700"
        }`}
    >
      {/* Avatar */}
      <div className="flex items-center justify-center md:col-span-1">
        <img
          src={photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt={EmployeeName}
          className="w-20 h-20 md:w-16 md:h-16 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
          }}
        />
      </div>

      {/* Datos */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left md:col-span-3">
        <h2 className="font-semibold text-blue-900 dark:text-indigo-700 text-lg">
          {EmployeeName}
        </h2>
        <p className="text-sm">{positionName}</p>
        <p className="text-sm">{rank?.name}</p>
        <p className="text-sm">{department?.name}</p>
        <p className="text-sm">{email}</p>
        <p className="text-sm">
          {sex ? sex.charAt(0).toUpperCase() + String(sex).slice(1) : ""}
        </p>
      </div>

      {/* Notas */}
      <div className="text-center md:block md:col-span-2 text-sm dark:text-white overflow-hidden">
        <p className="line-clamp-4">Notas: {notes}</p>
      </div>

      {/* Botones */}
      <div className="flex md:flex-col justify-center items-center gap-3 mt-4 md:mt-0 md:col-span-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClickEdit();
          }}
          className="text-xs px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 cursor-pointer flex items-center gap-1"
        >
          <span className="hidden md:flex">Editar</span>
          <AiOutlineEdit className="md:hidden" size={20} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClickDelete();
          }}
          className="text-xs px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 cursor-pointer flex items-center gap-1"
        >
          <span className="hidden md:flex">Borrar</span>
          <AiOutlineDelete className="md:hidden" size={20} />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
