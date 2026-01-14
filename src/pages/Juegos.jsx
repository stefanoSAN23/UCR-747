import React, { useEffect, useState } from "react";
import { gamesAPI } from "../services/api.js";

export default function Juegos() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        setLoading(true);
        const data = await gamesAPI.getAll();
        setJuegos(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching juegos:", err);
        setError("Error al cargar los juegos. Verifica que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchJuegos();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <div className="bg-purple-500 rounded-2xl p-16 mb-10 text-center shadow">
          <h1 className="text-3xl font-bold text-white">Juegos para Aprender</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando juegos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      {/* Encabezado */}
      <div className="bg-purple-500 rounded-2xl p-16 mb-10 text-center shadow">
        <h1 className="text-3xl font-bold text-white">Juegos para Aprender</h1>
        <p className="text-white mt-2 text-lg">
          Divertite mientras aprendés nuevas habilidades tecnológicas y creativas.
        </p>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">{error}</p>
        </div>
      )}

      {/* Lista de Juegos */}
      {juegos.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {juegos.map((j) => (
            <div
              key={j.game_id}
              className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={j.photo_game || "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60"}
                alt={j.name_game}
                className="w-full h-44 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">{j.name_game}</h3>
                <p className="text-sm text-gray-500 mb-3">{j.description || "Sin descripción"}</p>
                {j.link ? (
                  <a
                    href={j.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-purple-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-purple-600 transition"
                  >
                    Jugar ahora
                  </a>
                ) : (
                  <span className="inline-block bg-gray-300 text-gray-600 text-sm px-3 py-1 rounded-lg cursor-not-allowed">
                    Sin enlace disponible
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay juegos disponibles</p>
        </div>
      )}
    </div>
  );
}
