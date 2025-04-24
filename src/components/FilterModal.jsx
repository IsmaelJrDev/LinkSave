import { useState, useEffect } from 'react';
import { useLinks } from '../context/LinkContext';

export default function FilterModal({ isOpen, onClose, filter, setFilter }) {
  const { categories } = useLinks();
  const [selectedCategory, setSelectedCategory] = useState('Todas'); // Valor por defecto

  // Sync cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(filter || 'Todas'); // Si no hay filtro, 'Todas' por defecto
    }
  }, [isOpen, filter]);

  const handleFilterApply = () => {
    setFilter(selectedCategory); // Establecer el filtro seleccionado
    onClose(); // Cerrar el modal
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Filtrar por Categoría</h3>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2">Selecciona una Categoría</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Todas">Todas</option> {/* Mostrar opción "Todas" */}
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 px-6 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleFilterApply}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          >
            Aplicar Filtro
          </button>
        </div>
      </div>
    </div>
  );
}
