import React from "react";

export default function Juegos() {
  const juegos = [
    {
      titulo: "Code Combat",
      descripcion:
        "Aprendé programación jugando como un héroe en un mundo de fantasía. Ideal para aprender Python o JavaScript.",
      imagen:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60",
      enlace: "https://codecombat.com/",
    },
    {
      titulo: "TypingClub",
      descripcion:
        "Mejorá tu velocidad y precisión al escribir mientras completás misiones divertidas.",
      imagen:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60",
      enlace: "https://www.typingclub.com/",
    },
    {
      titulo: "Kahoot!",
      descripcion:
        "Participá en quizzes interactivos para repasar conocimientos y competir con tus compañeros.",
      imagen:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60",
      enlace: "https://kahoot.com/",
    },
    {
      titulo: "Scratch",
      descripcion:
        "Creá tus propios juegos y animaciones con bloques de código. Perfecto para principiantes.",
      imagen:
        "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=800&q=60",
      enlace: "https://scratch.mit.edu/",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      {/* Encabezado */}
      <div className="bg-purple-500 rounded-2xl p-16 mb-10 text-center shadow">
        <h1 className="text-3xl font-bold text-white">Juegos para Aprender</h1>
        <p className="text-white mt-2 text-lg">
          Divertite mientras aprendés nuevas habilidades tecnológicas y creativas.
        </p>
      </div>

      {/* Lista de Juegos */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {juegos.map((j, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img
              src={j.imagen}
              alt={j.titulo}
              className="w-full h-44 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-1">{j.titulo}</h3>
              <p className="text-sm text-gray-500 mb-3">{j.descripcion}</p>
              <a
                href={j.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-purple-600 transition"
              >
                Jugar ahora
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
