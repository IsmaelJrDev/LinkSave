import React, { createContext, useContext, useState, useEffect } from 'react';

const LinkContext = createContext();

export const useLinks = () => useContext(LinkContext);

export const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Recuperar enlaces y categorías del localStorage si existen
    const savedLinks = JSON.parse(localStorage.getItem('links')) || [];
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];

    setLinks(savedLinks);
    setCategories(savedCategories);
  }, []);

  const addLink = (link) => {
    const updatedLinks = [...links, link];
    setLinks(updatedLinks);
    // Guardar los enlaces en localStorage
    localStorage.setItem('links', JSON.stringify(updatedLinks));
  };

  const addCategory = (category) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    // Guardar las categorías en localStorage
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const removeLink = (linkUrl) => {
    const updatedLinks = links.filter((link) => link.url !== linkUrl);
    setLinks(updatedLinks);
    // Guardar los enlaces actualizados en localStorage
    localStorage.setItem('links', JSON.stringify(updatedLinks));
  };

  const removeCategory = (categoryName) => {
    const updatedCategories = categories.filter((cat) => cat.name !== categoryName);
    setCategories(updatedCategories);
    // Guardar las categorías actualizadas en localStorage
    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    // También eliminar los enlaces que pertenezcan a esa categoría
    const updatedLinks = links.filter((link) => link.category !== categoryName);
    setLinks(updatedLinks);
    // Guardar los enlaces actualizados en localStorage
    localStorage.setItem('links', JSON.stringify(updatedLinks));
  };

  return (
    <LinkContext.Provider
      value={{
        links,
        categories,
        addLink,
        addCategory,
        removeLink,
        removeCategory,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};
