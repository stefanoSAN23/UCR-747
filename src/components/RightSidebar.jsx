export default function RightSidebar() {
    return (
      <aside className="w-64 bg-white border-l border-gray-200 flex flex-col fixed right-0 top-0 bottom-0 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Buenos Días</h3>
        <p className="text-gray-500 text-sm">Usuario</p>
      </div>

      <div className="flex-1">
        <h4 className="font-semibold mb-3">Miembros TCU</h4>
        <ul className="space-y-3">
          {['Stefano Sánchez', 'Emanuel Agüero', 'Kevin Morera'].map((n, i) => (
            <li key={i} className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <span className="text-sm">{n}</span>
            </li>
          ))}
        </ul>
        <button className="mt-4 bg-blue-600 text-white text-sm px-4 py-1 rounded-lg w-full">
          Ver todos
        </button>
      </div>
    </aside>
    );
  }
  