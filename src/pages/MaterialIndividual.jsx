import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { materialsAPI } from "../services/api.js";

export default function MaterialIndividual() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        setLoading(true);
        const data = await materialsAPI.getById(parseInt(id));
        setMaterial(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching material:", err);
        setError("Error al cargar el material. Verifica que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMaterial();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando material...</p>
        </div>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error || "Material no encontrado"}</p>
        </div>
        <Link
          to="/material"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Volver a materiales
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <Link
        to="/material"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Volver a materiales
      </Link>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {material.photo_material && (
          <img
            src={material.photo_material}
            alt={material.name_material}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{material.name_material}</h1>
          
          <div className="mb-6 space-y-2">
            {material.date && (
              <p className="text-gray-600">
                <span className="font-semibold">Fecha:</span> {new Date(material.date).toLocaleDateString()}
              </p>
            )}
            {material.state && (
              <p className="text-gray-600">
                <span className="font-semibold">Estado:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    material.state === "Activo"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {material.state}
                </span>
              </p>
            )}
          </div>

          {material.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-gray-700">{material.description}</p>
            </div>
          )}

          {material.file_id && (
            <div className="mt-6">
              <a
                href={material.file_id}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Ver archivo
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

