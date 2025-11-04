import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      {/* Encabezado */}
      <div className="bg-blue-400 rounded-2xl p-16 mb-8 text-center shadow">
        <h1 className="text-3xl font-bold text-white">TC-747</h1>
        <p className="text-white mt-1 text-lg">Proyectos y Material Académico</p>
      </div>

      {/* Proyectos Destacados */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Proyectos Destacados</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              nombre: "App de Restaurante",
              desc: "Sitio web moderno con menú dinámico.",
              img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=60",
            },
            {
              nombre: "Gestor Académico",
              desc: "Aplicación web para gestión de cursos.",
              img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
            },
            {
              nombre: "Tienda de Productos",
              desc: "E-commerce con React y Firebase.",
              img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
            },
          ].map((p, i) => (
            <div key={i} className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition">
              <img
                src={p.img}
                alt={p.nombre}
                className="h-32 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold mb-1">{p.nombre}</h3>
              <p className="text-sm text-gray-500 mb-3">{p.desc}</p>
              <button className="bg-blue-400 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-500">
                Ver todos
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Creadores Destacados */}
      <section className="mb-12">
  <h2 className="text-xl font-semibold mb-4">Creadores Destacados</h2>
  <div className="bg-white shadow rounded-xl overflow-hidden">
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Carrera</th>
          <th className="px-4 py-2">Estado</th>
          <th className="px-4 py-2 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {[
          { nombre: "Emanuel Agüero", estado: "Activo" },
          { nombre: "Kevin Morera", estado: "Inactivo" },
          { nombre: "Stefano Sánchez", estado: "Inactivo" },
        ].map((c, i) => (
          <tr key={i} className="border-t">
            <td className="px-4 py-2">{c.nombre}</td>
            <td className="px-4 py-2">ITM</td>
            <td className="px-4 py-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  c.estado === "Activo"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {c.estado}
              </span>
            </td>
            <td className="px-4 py-2 text-right">
              <button className="text-blue-600 text-sm font-medium hover:underline">
                Ver trabajos
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Botón Ver más */}
  <div className="mt-4 flex justify-center">
    <Link
      to="/creadores"
      className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg shadow transition"
    >
      Ver más creadores
    </Link>
  </div>
</section>

      {/* Material Académico */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Materiales Académicos Más Utilizados</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              nombre: "Guía de Programación",
              desc: "Material completo para estudiantes de ITM.",
              img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60",
            },
            {
              nombre: "Diseño UI/UX",
              desc: "Presentación con fundamentos visuales.",
              img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
            },
            {
              nombre: "Arquitectura de Software",
              desc: "Apuntes resumidos del curso avanzado.",
              img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
            },
          ].map((m, i) => (
            <div key={i} className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition">
              <img
                src={m.img}
                alt={m.nombre}
                className="h-32 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold mb-1">{m.nombre}</h3>
              <p className="text-sm text-gray-500 mb-3">{m.desc}</p>
              <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700">
                Ver todos
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
