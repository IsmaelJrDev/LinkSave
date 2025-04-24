import { useLinks } from '../context/LinkContext';

export default function FilterSidebar({ filter, setFilter }) {
  const { categories } = useLinks();

  const handleFilterChange = (e) => {
    // Cambiar el filtro y actualizar el estado en el contexto
    setFilter(e.target.value);
  };

  return (
    <div className="w-full md:w-64 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Filtrar por Categoría</h3>
      <select
        value={filter}
        onChange={handleFilterChange} // Al cambiar, actualiza el filtro
        className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="Todas">Todas</option> {/* Opción para "Todas" */}
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
