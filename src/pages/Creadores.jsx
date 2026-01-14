import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { creatorsAPI } from "../services/api.js";

export default function Creadores() {
  const [creadores, setCreadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreadores = async () => {
      try {
        setLoading(true);
        const data = await creatorsAPI.getAll();
        setCreadores(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching creadores:", err);
        setError("Error al cargar los creadores. Verifica que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchCreadores();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <div className="bg-blue-400 rounded-2xl p-16 mb-10 text-center shadow">
          <h1 className="text-3xl font-bold text-white">Creadores Destacados</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando creadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      {/* Encabezado */}
      <div className="bg-blue-400 rounded-2xl p-16 mb-10 text-center shadow">
        <h1 className="text-3xl font-bold text-white">Creadores Destacados</h1>
        <p className="text-white mt-2 text-lg">
          Conocé a los estudiantes más activos y creativos del TC-747
        </p>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">{error}</p>
        </div>
      )}

      {/* Lista de Creadores */}
      {creadores.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {creadores.map((c) => (
            <div
              key={c.creator_id}
              className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={c.photo_creator || "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=600&q=60"}
                alt={c.name_creator}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{c.name_creator}</h3>
                <p className="text-sm text-gray-500 mb-2">{c.career || "N/A"}</p>
                <span
                  className={`inline-block mb-3 px-2 py-1 rounded-full text-xs font-medium ${
                    c.state === "Activo"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {c.state || "N/A"}
                </span>
                <div>
                  <Link
                    to={`/creadores/${c.creator_id}`}
                    className="inline-block bg-blue-400 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-500"
                  >
                    Ver trabajos
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay creadores disponibles</p>
        </div>
      )}
    </div>
  );
}
