import { useState } from "react";
import { LinkProvider } from "./context/LinkContext";
import AddLinkForm from "./components/AddLinkForm";
import AddCategoryModal from "./components/AddCategoryModal";
import FilterModal from "./components/FilterModal";
import LinkList from "./components/LinkList";

export default function App() {
    const [filter, setFilter] = useState("Todas");
    const [categories, setCategories] = useState([]);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        if (newFilter !== "Todas" && !categories.includes(newFilter)) {
            setCategories([...categories, newFilter]);
        }
    };

    return (
        <LinkProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
                <h2>Guarda tus links de una manera organizada y accede facilmente</h2>
                <div className="max-w-5xl mx-auto shadow-xl rounded-lg overflow-hidden dark:bg-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800">
                        {/* Columna izquierda: Agregar enlaces y categorías */}
                        <aside className="p-8 bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-extrabold mb-6 animate-pulse">
                                    <i class="bi bi-link"></i>
                                    LinkSave
                                </h2>
                                <AddLinkForm setIsCategoryModalOpen={setIsCategoryModalOpen} />
                            </div>
                            <div className="mt-8 text-sm text-indigo-200 dark:text-indigo-300">
                                <p>
                                    &copy; {new Date().getFullYear()} Tu Aplicación de Enlaces
                                </p>
                            </div>
                        </aside>

                        {/* Columna derecha: Lista de enlaces */}
                        <main className="p-8 dark:bg-gray-700">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
                                    <span className="border-b-2 border-indigo-500 pb-1">
                                        Tus Enlaces Guardados
                                    </span>
                                </h2>
                                <button
                                    onClick={() => setIsFilterModalOpen(true)}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                                >
                                    <i className="bi bi-filter-fill align-middle mr-2"></i>
                                    <i class="bi bi-search pr-4px"></i>
                                    Filtrar
                                </button>
                            </div>

                            {/* Mostrar las categorías filtradas como etiquetas */}
                            {categories.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-2">
                                        Filtros Activos:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-200 dark:text-indigo-900"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Aquí se mostraría la lista de enlaces */}
                            <LinkList filter={filter} />
                        </main>
                    </div>

                    {/* Modales */}
                    <AddCategoryModal
                        isOpen={isCategoryModalOpen}
                        onClose={() => setIsCategoryModalOpen(false)}
                    />
                    <FilterModal
                        isOpen={isFilterModalOpen}
                        onClose={() => setIsFilterModalOpen(false)}
                        setFilter={handleFilterChange}
                    />
                </div>
            </div>
        </LinkProvider>
    );
}
