import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { materialsAPI, creatorsAPI, categoriesAPI } from "../services/api.js";

export default function MaterialIndividual() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [creators, setCreators] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [photoType, setPhotoType] = useState("url");
  const [photoPreview, setPhotoPreview] = useState(null);

  // Formulario
  const [formData, setFormData] = useState({
    creator_id: "",
    category_id: "",
    name_material: "",
    description: "",
    photo_material: "",
    date: "",
    file_id: "",
    state: "",
  });

  useEffect(() => {
    fetchMaterial();
    fetchCreatorsAndCategories();
  }, [id]);

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      const data = await materialsAPI.getById(parseInt(id));
      setMaterial(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching material:", err);
      setError("Error al cargar el material. Verifica que el backend esté corriendo.");
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

  const handleEdit = () => {
    setPhotoType(material.photo_material?.startsWith("data:") ? "file" : "url");
    setPhotoPreview(material.photo_material || null);
    setFormData({
      creator_id: material.creator_id,
      category_id: material.category_id,
      name_material: material.name_material,
      description: material.description || "",
      photo_material: material.photo_material || "",
      date: material.date || "",
      file_id: material.file_id || "",
      state: material.state || "",
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
        setFormData({ ...formData, photo_material: base64String });
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        creator_id: parseInt(formData.creator_id),
        category_id: parseInt(formData.category_id),
        name_material: formData.name_material,
        description: formData.description || null,
        photo_material: formData.photo_material || null,
        date: formData.date || null,
        file_id: formData.file_id || null,
        state: formData.state || null,
      };

      await materialsAPI.update(material.material_id, submitData);
      setShowModal(false);
      fetchMaterial();
    } catch (err) {
      console.error("Error updating material:", err);
      alert("Error al actualizar el material");
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando material...</p>
        </div>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error || "Material no encontrado"}</p>
        </div>
        <Link
          to="/material"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Volver a materiales
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/material"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Volver a materiales
        </Link>
        <button
          onClick={handleEdit}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {material.photo_material && (
          <img
            src={material.photo_material}
            alt={material.name_material}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{material.name_material}</h1>
          
          <div className="mb-6 space-y-2">
            {material.date && (
              <p className="text-gray-600">
                <span className="font-semibold">Fecha:</span> {new Date(material.date).toLocaleDateString()}
              </p>
            )}
            {material.state && (
              <p className="text-gray-600">
                <span className="font-semibold">Estado:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    material.state === "Activo"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {material.state}
                </span>
              </p>
            )}
          </div>

          {material.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-gray-700">{material.description}</p>
            </div>
          )}

          {material.file_id && (
            <div className="mt-6">
              <a
                href={material.file_id}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Ver PDF del Material
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Edición */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Editar Material</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre del Material *</label>
                  <input
                    type="text"
                    required
                    value={formData.name_material}
                    onChange={(e) => setFormData({ ...formData, name_material: e.target.value })}
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
                          setFormData({ ...formData, photo_material: "" });
                        }}
                        className={`px-3 py-1 text-sm rounded ${
                          photoType === "url"
                            ? "bg-blue-600 text-white"
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
                          setFormData({ ...formData, photo_material: "" });
                        }}
                        className={`px-3 py-1 text-sm rounded ${
                          photoType === "file"
                            ? "bg-blue-600 text-white"
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
                      value={formData.photo_material}
                      onChange={(e) => {
                        setFormData({ ...formData, photo_material: e.target.value });
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
                  <label className="block text-sm font-medium mb-1">Enlace al PDF</label>
                  <input
                    type="url"
                    value={formData.file_id}
                    onChange={(e) => setFormData({ ...formData, file_id: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="https://ejemplo.com/material.pdf"
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
