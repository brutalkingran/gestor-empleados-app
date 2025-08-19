const EmployeeCard = ({ EmployeeName, avatar, positionName, rank, department, isActive, entryDate,
employeeEmail,
phoneNumber,
sex,
age,
stressLevel, notes, onClickDetails, onClickEdit, onClickDelete }) => {
  return (
    <div
      onClick={onClickDetails}
      className={`grid grid-cols-7 gap-4 p-4 rounded-lg shadow-md transition cursor-pointer
        ${isActive ? "bg-white" : "bg-red-100 border border-red-300"}`}
    >
      {/* Avatar */}
      <div className="col-span-1 flex items-center justify-center">
        <img
          src={avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt={EmployeeName}
          className="w-16 h-16 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
          }}
        />
      </div>

      {/* Datos */}
      <div className="col-span-3 flex flex-col justify-center">
        <h2 className="font-semibold text-blue-900">{EmployeeName}</h2>
        <p className="text-sm text-gray-600">{positionName}</p>
        <p className="text-sm text-gray-600">{rank}</p>
        <p className="text-sm text-gray-600">{department}</p>
        <p className="text-sm text-gray-600">{employeeEmail}</p>
        <p className="text-sm text-gray-600">{sex.charAt(0).toUpperCase() + String(sex).slice(1)}</p>
      </div>

      {/* Notas */}
      <div className="col-span-2 text-sm text-gray-700 overflow-hidden">
        <p className="line-clamp-4">{notes}</p>
      </div>

      {/* Botones */}
      <div className="col-span-1 flex flex-col items-center justify-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation(); // evita que se ejecute el onClick del padre
            onClickEdit();
          }}
          className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 cursor-pointer"
        >
          Editar
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClickDelete();
          }}
          className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 cursor-pointer"
        >
          Borrar
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;