import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { materialsAPI } from "../services/api.js";

export default function Material() {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        setLoading(true);
        const data = await materialsAPI.getAll();
        setMateriales(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching materiales:", err);
        setError("Error al cargar los materiales. Verifica que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchMateriales();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Material Académico</h1>
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando materiales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Material Académico</h1>
      
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">{error}</p>
        </div>
      )}

      {materiales.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materiales.map((m) => (
            <div
              key={m.material_id}
              className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <img
                src={m.photo_material || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60"}
                alt={m.name_material}
                className="h-40 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold mb-1">{m.name_material}</h3>
              <p className="text-sm text-gray-500 mb-2">{m.description || "Sin descripción"}</p>
              <Link
                to={`/material/${m.material_id}`}
                className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700"
              >
                Ver detalles
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay materiales disponibles</p>
        </div>
      )}
    </div>
  );
}
  