import React from "react";

export default function Creadores() {
  const creadores = [
    {
      nombre: "Emanuel Agüero",
      carrera: "Informática y Tecnología Multimedio",
      estado: "Activo",
      img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=600&q=60",
    },
    {
      nombre: "Kevin Morera",
      carrera: "Ingeniería de Software",
      estado: "Inactivo",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=60",
    },
    {
      nombre: "Stefano Sánchez",
      carrera: "Diseño Digital",
      estado: "Inactivo",
      img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=600&q=60",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      {/* Encabezado */}
      <div className="bg-blue-400 rounded-2xl p-16 mb-10 text-center shadow">
        <h1 className="text-3xl font-bold text-white">Creadores Destacados</h1>
        <p className="text-white mt-2 text-lg">
          Conocé a los estudiantes más activos y creativos del TC-747
        </p>
      </div>

      {/* Lista de Creadores */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {creadores.map((c, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img
              src={c.img}
              alt={c.nombre}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold">{c.nombre}</h3>
              <p className="text-sm text-gray-500 mb-2">{c.carrera}</p>
              <span
                className={`inline-block mb-3 px-2 py-1 rounded-full text-xs font-medium ${
                  c.estado === "Activo"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {c.estado}
              </span>
              <div>
                <button className="bg-blue-400 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-500">
                  Ver trabajos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
