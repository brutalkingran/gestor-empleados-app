import { useEffect } from "react";
import { useProfileContext } from "../context/ProfileContext";
import ProfileCard from "./ProfileCard";
import { useNavigate, useSearchParams } from "react-router";
import { ClipLoader } from "react-spinners";

const Profiles = () => {
  const { profiles, loading, fetchProfiles, totalCount } = useProfileContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // 🔽 valores desde la URL
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "firstName";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const limit = 10;
  const totalPages = Math.max(1, Math.ceil((totalCount || profiles.length) / limit));

  // 📌 cada vez que cambian los query params → fetch
  useEffect(() => {
    fetchProfiles();
  }, [currentPage, sortBy, sortOrder]);

  if (loading) {
    return (
      <div className="flex flex-col text-center items-center mt-10">
        <ClipLoader color="#0000FF" size={100}/>
        <p className="text-blue-400 mt-3">Cargando perfiles...</p>
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="mb-2 text-neutral-500 italic">- No hay perfiles -</p>
        <button
          onClick={() => navigate('/profile-create')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
        >
          Añadir Perfil
        </button>
      </div>
    );
  }

  return (
    <div className="md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center dark:text-white">
        Dashboard de Perfiles
      </h1>

      {/* Botón crear */}
      <div className="mb-5 text-center">
        <button
          onClick={() => navigate('/profile-create')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
        >
          Añadir Perfil
        </button>
      </div>

      {/* Controles de orden */}
      <div className="flex items-center space-x-4 mb-6 justify-center">
        <label className="text-gray-700">Ordenar por:</label>
        <select
          value={sortBy}
          onChange={(e) => setSearchParams({ page: currentPage, sortBy: e.target.value, sortOrder })}
          className="px-2 py-1 border rounded"
        >
          <option value="firstName">Nombre</option>
          <option value="lastName">Apellido</option>
          <option value="username">Username</option>
          <option value="rank">Rango</option>
          <option value="isDeleted">Eliminado</option>
        </select>

        <button
          onClick={() => setSearchParams({ page: currentPage, sortBy, sortOrder: "asc" })}
          className={`px-3 py-1 rounded ${sortOrder === "asc" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Asc.
        </button>
        <button
          onClick={() => setSearchParams({ page: currentPage, sortBy, sortOrder: "desc" })}
          className={`px-3 py-1 rounded ${sortOrder === "desc" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Desc.
        </button>
      </div>

      {/* Grid de perfiles */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile._id}
            firstName={profile.firstName}
            lastName={profile.lastName}
            email={profile.email}
            rank={profile.rank}
            isDeleted={profile.isDeleted}
            onClickEdit={() => navigate(`/profile/${profile._id}/edit`)}
          />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center justify-center mt-8 space-x-4">
        <button
          onClick={() =>
            setSearchParams({ page: Math.max(currentPage - 1, 1), sortBy, sortOrder })
          }
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 cursor-pointer"
        >
          Anterior
        </button>

        <span>
          Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
        </span>

        <button
          onClick={() =>
            setSearchParams({ page: Math.min(currentPage + 1, totalPages), sortBy, sortOrder })
          }
          disabled={currentPage === totalPages || profiles.length === 0}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Profiles;
