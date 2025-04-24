import { useLinks } from '../context/LinkContext';
import { useState } from 'react';

export default function FilterSidebar({ setFilter }) {
  const { categories } = useLinks();
  
  return (
    <div className="w-64 bg-gray-100 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Filtrar por Categoría</h3>
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg"
      >
        <option value="Todas">Todas</option>
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
