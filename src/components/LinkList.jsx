import { useLinks } from '../context/LinkContext';
import { useState } from 'react';

export default function LinkList() {
  const { links, categories } = useLinks();
  const [filter, setFilter] = useState('Todas');

  // Filtrar links según categoría seleccionada
  const filteredLinks = filter === 'Todas' 
    ? links 
    : links.filter(link => link.category === filter);

  if (!links || !categories) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-xl font-semibold mb-4">Tus Links Guardados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLinks.length === 0 ? (
          <div>No hay enlaces disponibles para esta categoría.</div>
        ) : (
          filteredLinks.map((link, index) => (
            <div key={index} className={`p-4 rounded-lg shadow ${link.color}`}>
              <h3 className="font-semibold">{link.name}</h3>
              <p>{link.desc}</p>
              <a href={link.url} className="underline text-blue-500" target="_blank" rel="noopener noreferrer">
                Visitar
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
