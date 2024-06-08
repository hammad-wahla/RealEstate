import React, { useState } from "react";
import { getProperties } from "../../utils/propertyData";

const SearchFilter = ({ setProperties }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ type: "", location: "" });

  const handleSearch = async () => {
    try {
      const params = {
        type: filter.type,
        location: filter.location,
      };

      let properties = await getProperties(params);

      if (searchTerm.trim() !== "") {
        const searchWords = searchTerm.trim().toLowerCase().split(/\s+/);
        properties = properties.filter((property) => {
          return searchWords.every((word) =>
            property.description.toLowerCase().includes(word)
          );
        });
      }

      setProperties(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const clearFilter = async () => {
    setSearchTerm("");
    setFilter({ type: "", location: "" });
    try {
      const properties = await getProperties();
      setProperties(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="border border-gray-300 rounded-md p-2 w-48 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        value={filter.location}
        onChange={(e) => setFilter({ ...filter, location: e.target.value })}
        placeholder="Location"
        className="border border-gray-300 rounded-md p-2 w-48 focus:outline-none focus:border-blue-500"
      />
      <select
        value={filter.type}
        onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
      >
        <option value="">All Types</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Condo">Condo</option>
        <option value="Villa">Villa</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
      >
        Search
      </button>
      <button
        onClick={clearFilter}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
      >
        Clear Filter
      </button>
    </div>
  );
};

export default SearchFilter;
