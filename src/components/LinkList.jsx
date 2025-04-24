import { useLinks } from '../context/LinkContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function LinkList({ filter }) {
  const { links, categories, removeLink } = useLinks();

  const filteredLinks =
    filter === 'Todas'
      ? links
      : links.filter((link) => link.category === filter);

  const getCategoryColor = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category?.color || '#E5E7EB'; // gris claro por defecto
  };

  if (filteredLinks.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-300 text-center">
        No hay enlaces disponibles en esta categoría.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex flex-col space-y-4 min-w-full px-2 max-h-[300px]">
        <AnimatePresence>
          {filteredLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.3 }}
              className="min-w-[250px] max-w-sm w-full rounded-lg shadow-md p-4 flex-shrink-0"
              style={{
                backgroundColor: getCategoryColor(link.category),
              }}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">
                  {link.description}
                </p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white bg-black bg-opacity-30 hover:bg-opacity-50 px-3 py-1 rounded transition"
                >
                  Visitar enlace
                </a>
                <button
                  onClick={() => removeLink(link.url)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
