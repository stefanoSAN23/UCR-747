import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projectsAPI } from "../services/api.js";

export default function ProyectoIndividual() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        setLoading(true);
        const data = await projectsAPI.getFull(parseInt(id));
        setProyecto(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching proyecto:", err);
        setError("Error al cargar el proyecto. Verifica que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProyecto();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  if (error || !proyecto) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error || "Proyecto no encontrado"}</p>
        </div>
        <Link
          to="/proyectos"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Volver a proyectos
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <Link
        to="/proyectos"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Volver a proyectos
      </Link>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {proyecto.photo_project && (
          <img
            src={proyecto.photo_project}
            alt={proyecto.name_project}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{proyecto.name_project}</h1>
          
          <div className="mb-6 space-y-2">
            {proyecto.creator_name && (
              <p className="text-gray-600">
                <span className="font-semibold">Creador:</span> {proyecto.creator_name}
              </p>
            )}
            {proyecto.category_name && (
              <p className="text-gray-600">
                <span className="font-semibold">Categoría:</span> {proyecto.category_name}
              </p>
            )}
            {proyecto.date && (
              <p className="text-gray-600">
                <span className="font-semibold">Fecha:</span> {new Date(proyecto.date).toLocaleDateString()}
              </p>
            )}
            {proyecto.state && (
              <p className="text-gray-600">
                <span className="font-semibold">Estado:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    proyecto.state === "Activo"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {proyecto.state}
                </span>
              </p>
            )}
          </div>

          {proyecto.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-gray-700">{proyecto.description}</p>
            </div>
          )}

          {proyecto.file_id && (
            <div className="mt-6">
              <a
                href={proyecto.file_id}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
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

