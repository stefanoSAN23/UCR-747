export default function Proyectos() {
    const proyectos = [
      {
        id: 1,
        nombre: "Ticolancer",
        descripcion: "Plataforma para conectar emprendedores nacionales.",
        imagen: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 2,
        nombre: "Kimchis",
        descripcion: "Sitio web inspirado en la gastronomía coreana.",
        imagen: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 3,
        nombre: "Jint",
        descripcion: "Plataforma para asignación de tareas entre profesores.",
        imagen: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 4,
        nombre: "Madera Art",
        descripcion: "Tienda online de productos artesanales en madera.",
        imagen: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 5,
        nombre: "LoopMarket",
        descripcion: "Marketplace para comprar y vender loops musicales.",
        imagen: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 6,
        nombre: "FitTrack",
        descripcion: "App de registro de progreso físico y nutricional.",
        imagen: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
      },
    ];
  
    return (
      <>
        <h1 className="text-2xl font-bold mb-4">Proyectos Destacados</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={p.imagen}
                alt={p.nombre}
                className="h-40 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold mb-1">{p.nombre}</h3>
              <p className="text-sm text-gray-500 mb-2">{p.descripcion}</p>
              <button className="bg-blue-400 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-500">
                Ver todos
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
  