import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { creatorsAPI } from "../services/api.js";

export default function Creadores() {
  const [creadores, setCreadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCreator, setEditingCreator] = useState(null);
  const [photoType, setPhotoType] = useState("url");
  const [photoPreview, setPhotoPreview] = useState(null);

  // Formulario
  const [formData, setFormData] = useState({
    name_creator: "",
    photo_creator: "",
    state: "",
    career: "",
  });

  useEffect(() => {
    fetchCreadores();
  }, []);

  const fetchCreadores = async () => {
    try {
      setLoading(true);
      const data = await creatorsAPI.getAll();
      setCreadores(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching creadores:", err);
      setError("Error al cargar los creadores. Verifica que el backend esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCreator(null);
    setPhotoType("url");
    setPhotoPreview(null);
    setFormData({
      name_creator: "",
      photo_creator: "",
      state: "",
      career: "",
    });
    setShowModal(true);
  };

  const handleEdit = (creator) => {
    setEditingCreator(creator);
    setPhotoType(creator.photo_creator?.startsWith("data:") ? "file" : "url");
    setPhotoPreview(creator.photo_creator || null);
    setFormData({
      name_creator: creator.name_creator,
      photo_creator: creator.photo_creator || "",
      state: creator.state || "",
      career: creator.career || "",
    });
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("El archivo es demasiado grande. Máximo 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({ ...formData, photo_creator: base64String });
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este creador?")) {
      return;
    }
    try {
      await creatorsAPI.delete(id);
      fetchCreadores();
    } catch (err) {
      console.error("Error deleting creator:", err);
      alert("Error al eliminar el creador");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        name_creator: formData.name_creator,
        photo_creator: formData.photo_creator || null,
        state: formData.state || null,
        career: formData.career || null,
      };

      if (editingCreator) {
        await creatorsAPI.update(editingCreator.creator_id, submitData);
      } else {
        await creatorsAPI.create(submitData);
      }

      setShowModal(false);
      fetchCreadores();
    } catch (err) {
      console.error("Error saving creator:", err);
      alert("Error al guardar el creador");
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <div className="bg-blue-400 rounded-2xl p-16 mb-10 text-center shadow">
          <h1 className="text-3xl font-bold text-white">Creadores Destacados</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando creadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      {/* Encabezado */}
      <div className="bg-blue-400 rounded-2xl p-16 mb-10 text-center shadow">
        <h1 className="text-3xl font-bold text-white">Creadores Destacados</h1>
        <p className="text-white mt-2 text-lg">
          Conocé a los estudiantes más activos y creativos del TC-747
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Agregar Creador
        </button>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">{error}</p>
        </div>
      )}

      {/* Lista de Creadores */}
      {creadores.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {creadores.map((c) => (
            <div
              key={c.creator_id}
              className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={c.photo_creator || "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=600&q=60"}
                alt={c.name_creator}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{c.name_creator}</h3>
                <p className="text-sm text-gray-500 mb-2">{c.career || "N/A"}</p>
                <span
                  className={`inline-block mb-3 px-2 py-1 rounded-full text-xs font-medium ${
                    c.state === "Activo"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {c.state || "N/A"}
                </span>
                <div className="flex gap-2">
                  <Link
                    to={`/creadores/${c.creator_id}`}
                    className="flex-1 text-center bg-blue-400 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-500"
                  >
                    Ver trabajos
                  </Link>
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded-lg"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.creator_id)}
                    className="bg-red-400 hover:bg-red-500 text-white text-sm px-3 py-1 rounded-lg"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay creadores disponibles</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingCreator ? "Editar Creador" : "Nuevo Creador"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre del Creador *</label>
                  <input
                    type="text"
                    required
                    value={formData.name_creator}
                    onChange={(e) => setFormData({ ...formData, name_creator: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estado</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Carrera</label>
                  <input
                    type="text"
                    value={formData.career}
                    onChange={(e) => setFormData({ ...formData, career: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Foto</label>
                  <div className="mb-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoType("url");
                          setPhotoPreview(null);
                          setFormData({ ...formData, photo_creator: "" });
                        }}
                        className={`px-3 py-1 text-sm rounded ${
                          photoType === "url"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        URL
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoType("file");
                          setPhotoPreview(null);
                          setFormData({ ...formData, photo_creator: "" });
                        }}
                        className={`px-3 py-1 text-sm rounded ${
                          photoType === "file"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        Archivo
                      </button>
                    </div>
                  </div>
                  {photoType === "url" ? (
                    <input
                      type="url"
                      value={formData.photo_creator}
                      onChange={(e) => {
                        setFormData({ ...formData, photo_creator: e.target.value });
                        setPhotoPreview(e.target.value || null);
                      }}
                      className="w-full border rounded px-3 py-2"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  )}
                  {photoPreview && (
                    <div className="mt-2">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {editingCreator ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
