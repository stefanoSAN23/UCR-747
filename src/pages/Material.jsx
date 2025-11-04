export default function Material() {
    const materiales = [
      {
        id: 1,
        nombre: "Introducción a la Programación",
        descripcion: "Conceptos básicos de programación y lógica.",
        imagen: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 2,
        nombre: "Diseño UX/UI",
        descripcion: "Principios fundamentales del diseño centrado en el usuario.",
        imagen: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 3,
        nombre: "Bases de Datos",
        descripcion: "Guía práctica para aprender SQL y modelado de datos.",
        imagen: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 4,
        nombre: "Desarrollo Web",
        descripcion: "HTML, CSS y JavaScript desde cero.",
        imagen: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 5,
        nombre: "Inteligencia Artificial",
        descripcion: "Introducción al aprendizaje automático con Python.",
        imagen: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 6,
        nombre: "Redes y Seguridad",
        descripcion: "Conceptos clave sobre redes informáticas y ciberseguridad.",
        imagen: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 7,
        nombre: "Animación y Multimedia",
        descripcion: "Técnicas básicas para crear contenido animado.",
        imagen: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 8,
        nombre: "Desarrollo Móvil",
        descripcion: "Curso básico de apps móviles con React Native.",
        imagen: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 9,
        nombre: "Emprendimiento Digital",
        descripcion: "Cómo lanzar un proyecto tecnológico exitoso.",
        imagen: "https://images.unsplash.com/photo-1522205408450-add114ad53fe?auto=format&fit=crop&w=800&q=60",
      },
    ];
  
    return (
      <>
        <h1 className="text-2xl font-bold mb-4">Material Académico</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materiales.map((m) => (
            <div
              key={m.id}
              className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <img
                src={m.imagen}
                alt={m.nombre}
                className="h-40 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold mb-1">{m.nombre}</h3>
              <p className="text-sm text-gray-500 mb-2">{m.descripcion}</p>
              <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700">
                Ver todos
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
  