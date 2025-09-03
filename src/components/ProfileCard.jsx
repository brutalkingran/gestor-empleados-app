import { AiOutlineEdit } from "react-icons/ai";
import { useAuthContext } from "../context/AuthContext";

const ProfileCard = ({
  firstName,
  lastName,
  email,
  rank,
  isDeleted,
  onClickEdit,
}) => {
  const { user } = useAuthContext();

  const fullName = `${firstName} ${lastName}`;

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg shadow-md transition 
        ${!isDeleted
          ? "bg-white dark:bg-indigo-300"
          : "bg-red-100 border border-red-300 dark:border-indigo-700 dark:bg-indigo-700"
        }`}
    >
      {/* Datos principales */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left md:col-span-3">
        <h2 className="font-semibold text-blue-900 dark:text-indigo-700 text-lg">
          {fullName}
        </h2>
        <p className="text-sm">{email}</p>
        <p className="text-sm">{rank?.name}</p>
        <p className="text-sm text-red-600">
          {isDeleted ? "Usuario eliminado" : ""}
        </p>
      </div>

      {/* Botón editar */}
      <div className="flex justify-center items-center md:col-span-1">
        {
          user.rank?.permissions?.includes("manage_all_employees") && (
            <button
              onClick={onClickEdit}
              className="text-xs px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 cursor-pointer flex items-center gap-1"
            >
              <span className="hidden md:flex">Editar</span>
              <AiOutlineEdit className="md:hidden" size={20} />
            </button>
          )
        }
      </div>
    </div>
  );
};

export default ProfileCard;
