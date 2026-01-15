import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { creatorsAPI } from "../services/api.js";

export default function RightSidebar() {
  const [creadores, setCreadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreadores = async () => {
      try {
        const data = await creatorsAPI.getAll();
        // Limitar a los primeros 5 creadores para el sidebar
        setCreadores(data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching creadores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCreadores();
  }, []);

  return (
    <aside className="w-64 bg-white border-l border-gray-200 flex flex-col fixed right-0 top-0 bottom-0 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Buenos Días</h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        <h4 className="font-semibold mb-3">Miembros TCU</h4>
        {loading ? (
          <p className="text-sm text-gray-500">Cargando...</p>
        ) : creadores.length > 0 ? (
          <>
            <ul className="space-y-3">
              {creadores.map((creador) => (
                <li key={creador.creator_id} className="flex items-center space-x-3">
                  <img
                    src={creador.photo_creator || "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=600&q=60"}
                    alt={creador.name_creator}
                    className="w-8 h-8 rounded-full object-cover bg-gray-200"
                  />
                  <span className="text-sm">{creador.name_creator}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/creadores"
              className="mt-4 block bg-blue-600 text-white text-sm px-4 py-1 rounded-lg w-full text-center hover:bg-blue-700 transition"
            >
              Ver todos
            </Link>
          </>
        ) : (
          <p className="text-sm text-gray-500">No hay creadores disponibles</p>
        )}
      </div>
    </aside>
  );
}
