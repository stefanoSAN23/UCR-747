import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectsAPI, creatorsAPI, categoriesAPI } from "../services/api.js";

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [creators, setCreators] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [photoType, setPhotoType] = useState("url"); // "url" o "file"
  const [photoPreview, setPhotoPreview] = useState(null);
  
  // Filtros
  const [filters, setFilters] = useState({
    state: "",
    category_id: "",
    creator_id: "",
  });

  // Formulario
  const [formData, setFormData] = useState({
    creator_id: "",
    category_id: "",
    name_project: "",
    description: "",
    photo_project: "",
    date: "",
    file_id: "",
    state: "",
  });

  useEffect(() => {
    fetchData();
    fetchCreatorsAndCategories();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.state) params.state = filters.state;
      if (filters.category_id) params.category_id = filters.category_id;
      if (filters.creator_id) params.creator_id = filters.creator_id;
      
      const data = await projectsAPI.getAll(params);
      setProyectos(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching proyectos:", err);
      setError("Error al cargar los proyectos. Verifica que el backend esté corriendo.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCreatorsAndCategories = async () => {
    try {
      const [creatorsData, categoriesData] = await Promise.all([
        creatorsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      setCreators(creatorsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error fetching creators/categories:", err);
    }
  };

  const handleCreate = () => {
    setEditingProject(null);
    setPhotoType("url");
    setPhotoPreview(null);
    setFormData({
      creator_id: "",
      category_id: "",
      name_project: "",
      description: "",
      photo_project: "",
      date: "",
      file_id: "",
      state: "",
    });
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setPhotoType(project.photo_project?.startsWith("data:") ? "file" : "url");
    setPhotoPreview(project.photo_project || null);
    setFormData({
      creator_id: project.creator_id,
      category_id: project.category_id,
      name_project: project.name_project,
      description: project.description || "",
      photo_project: project.photo_project || "",
      date: project.date || "",
      file_id: project.file_id || "",
      state: project.state || "",
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
        setFormData({ ...formData, photo_project: base64String });
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      return;
    }
    try {
      await projectsAPI.delete(id);
      fetchData();
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Error al eliminar el proyecto");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        creator_id: parseInt(formData.creator_id),
        category_id: parseInt(formData.category_id),
        name_project: formData.name_project,
        description: formData.description || null,
        photo_project: formData.photo_project || null,
        date: formData.date || null,
        file_id: formData.file_id || null,
        state: formData.state || null,
      };

      if (editingProject) {
        await projectsAPI.update(editingProject.project_id, submitData);
      } else {
        await projectsAPI.create(submitData);
      }
      
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Error al guardar el proyecto");
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({ state: "", category_id: "", creator_id: "" });
  };

  if (loading && proyectos.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Proyectos Destacados</h1>
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proyectos Destacados</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Agregar Proyecto
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <select
              value={filters.category_id}
              onChange={(e) => handleFilterChange("category_id", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Todas</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.name_category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Creador</label>
            <select
              value={filters.creator_id}
              onChange={(e) => handleFilterChange("creator_id", e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Todos</option>
              {creators.map((creator) => (
                <option key={creator.creator_id} value={creator.creator_id}>
                  {creator.name_creator}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">{error}</p>
        </div>
      )}

      {proyectos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((p) => (
            <div
              key={p.project_id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <img
                src={p.photo_project || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60"}
                alt={p.name_project}
                className="h-40 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold mb-1">{p.name_project}</h3>
              <p className="text-sm text-gray-500 mb-2 line-clamp-3 flex-1">{p.description || "Sin descripción"}</p>
              <div className="flex gap-2 mt-auto pt-3">
                <Link
                  to={`/proyectos/${p.project_id}`}
                  className="flex-1 text-center bg-blue-400 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-500"
                >
                  Ver
                </Link>
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded-lg"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.project_id)}
                  className="bg-red-400 hover:bg-red-500 text-white text-sm px-3 py-1 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay proyectos disponibles</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre del Proyecto *</label>
                  <input
                    type="text"
                    required
                    value={formData.name_project}
                    onChange={(e) => setFormData({ ...formData, name_project: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Creador *</label>
                  <select
                    required
                    value={formData.creator_id}
                    onChange={(e) => setFormData({ ...formData, creator_id: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Seleccionar...</option>
                    {creators.map((creator) => (
                      <option key={creator.creator_id} value={creator.creator_id}>
                        {creator.name_creator}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Categoría *</label>
                  <select
                    required
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Seleccionar...</option>
                    {categories.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.name_category}
                      </option>
                    ))}
                  </select>
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    rows="3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Imagen</label>
                  <div className="mb-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoType("url");
                          setPhotoPreview(null);
                          setFormData({ ...formData, photo_project: "" });
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
                          setFormData({ ...formData, photo_project: "" });
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
                      value={formData.photo_project}
                      onChange={(e) => {
                        setFormData({ ...formData, photo_project: e.target.value });
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
                <div>
                  <label className="block text-sm font-medium mb-1">Fecha</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Enlace del Proyecto</label>
                  <input
                    type="url"
                    value={formData.file_id}
                    onChange={(e) => setFormData({ ...formData, file_id: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="https://ejemplo.com/proyecto o https://github.com/usuario/proyecto"
                  />
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
                  {editingProject ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
