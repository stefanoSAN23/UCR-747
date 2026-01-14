import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { creatorsAPI, projectsAPI, gamesAPI, materialsAPI } from "../services/api.js";

export default function PerfilCreador() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [projects, setProjects] = useState([]);
  const [games, setGames] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [creatorData, projectsData, gamesData, materialsData] = await Promise.all([
          creatorsAPI.getSummary(parseInt(id)).catch(() => null),
          projectsAPI.getAll({ creator_id: id }).catch(() => []),
          gamesAPI.getAll({ creator_id: id }).catch(() => []),
          materialsAPI.getAll({ creator_id: id }).catch(() => []),
        ]);

        setCreator(creatorData);
        setProjects(projectsData);
        setGames(gamesData);
        setMaterials(materialsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching creator data:", err);
        setError("Error al cargar el perfil del creador. Verifica que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error || "Creador no encontrado"}</p>
        </div>
        <Link
          to="/creadores"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Volver a creadores
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <Link
        to="/creadores"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Volver a creadores
      </Link>

      {/* Perfil del Creador */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-8">
        <div className="bg-blue-400 h-32"></div>
        <div className="px-8 pb-8 -mt-16">
          <div className="flex items-end gap-6 mb-6">
            {creator.photo_creator && (
              <img
                src={creator.photo_creator}
                alt={creator.name_creator}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2">{creator.name_creator}</h1>
              {creator.career && (
                <p className="text-gray-600 mb-2">{creator.career}</p>
              )}
              {creator.state && (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    creator.state === "Activo"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {creator.state}
                </span>
              )}
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{creator.projects_count || 0}</div>
              <div className="text-sm text-gray-600">Proyectos</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{creator.games_count || 0}</div>
              <div className="text-sm text-gray-600">Juegos</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{creator.materials_count || 0}</div>
              <div className="text-sm text-gray-600">Materiales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Proyectos */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Proyectos ({projects.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <Link
                key={p.project_id}
                to={`/proyectos/${p.project_id}`}
                className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
              >
                {p.photo_project && (
                  <img
                    src={p.photo_project}
                    alt={p.name_project}
                    className="h-32 w-full object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-semibold mb-1">{p.name_project}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{p.description || "Sin descripción"}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Juegos */}
      {games.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Juegos ({games.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((g) => (
              <div
                key={g.game_id}
                className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
              >
                {g.photo_game && (
                  <img
                    src={g.photo_game}
                    alt={g.name_game}
                    className="h-32 w-full object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-semibold mb-1">{g.name_game}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{g.description || "Sin descripción"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Materiales */}
      {materials.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Materiales Académicos ({materials.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((m) => (
              <Link
                key={m.material_id}
                to={`/material/${m.material_id}`}
                className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
              >
                {m.photo_material && (
                  <img
                    src={m.photo_material}
                    alt={m.name_material}
                    className="h-32 w-full object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-semibold mb-1">{m.name_material}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{m.description || "Sin descripción"}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {projects.length === 0 && games.length === 0 && materials.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Este creador aún no tiene proyectos, juegos o materiales publicados.</p>
        </div>
      )}
    </div>
  );
}

