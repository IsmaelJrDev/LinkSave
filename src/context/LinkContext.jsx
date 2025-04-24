import { createContext, useState, useContext } from 'react';

const LinkContext = createContext();

export const useLinks = () => {
  return useContext(LinkContext);
};

export const LinkProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [links, setLinks] = useState([]);

  const addCategory = ({ name, color }) => {
    setCategories((prev) => [...prev, { name, color }]);
  };

  const addLink = ({ title, url, description, category }) => {
    setLinks((prev) => [
      ...prev,
      { title, url, description, category, id: Math.random().toString() },
    ]);
  };

  return (
    <LinkContext.Provider value={{ categories, addCategory, links, addLink }}>
      {children}
    </LinkContext.Provider>
  );
};
