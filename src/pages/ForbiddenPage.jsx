const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">403 - Acceso Denegado</h1>
      <p className="mt-4 text-lg text-gray-600">
        No tienes permisos para acceder a esta sección.
      </p>
    </div>
  );
};

export default Forbidden;
