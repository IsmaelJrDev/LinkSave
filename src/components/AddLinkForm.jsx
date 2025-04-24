import { useState } from 'react';
import { useLinks } from '../context/LinkContext';

export default function AddLinkForm({ setIsCategoryModalOpen }) {
  const { categories, addLink } = useLinks();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !url || !category) return; // Verifica que no falten campos
    addLink({ title, url, description, category });
    setTitle('');
    setUrl('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white">Nombre</label>
        <input
          id="title"
          type="text"
          placeholder="Nombre del enlace"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-white">URL</label>
        <input
          id="url"
          type="url"
          placeholder="URL del enlace"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white">Descripción</label>
        <textarea
          id="description"
          placeholder="Descripción del enlace"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-white">Categoría</label>
        <div className="flex items-center space-x-2">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Botón para abrir modal de agregar categoría */}
          <button
            type="button"
            onClick={() => setIsCategoryModalOpen(true)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:hover:bg-indigo-800"
          >
            <i className="bi bi-tag-fill align-middle mr-2"></i>
            Agregar Categoría
          </button>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Guardar Enlace
        </button>
      </div>
    </form>
  );
}
