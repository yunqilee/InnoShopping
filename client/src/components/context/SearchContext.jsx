import React, {createContext, useState, useContext} from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <SearchContext.Provider value={{
            searchTerm,
            setSearchTerm,
            selectedCategory,
            setSelectedCategory
        }}>
            {children}
        </SearchContext.Provider>
    );
};