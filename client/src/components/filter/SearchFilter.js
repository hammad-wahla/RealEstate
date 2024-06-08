import React, { useState } from "react";
import { getProperties } from "../../utils/propertyData";

const SearchFilter = ({ setProperties }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ type: "", location: "" });
  const [showFilters, setShowFilters] = useState(false); // State to control filter visibility

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
          return searchWords.every(
            (word) =>
              word.length >= 3 &&
              (property.title.toLowerCase().includes(word) ||
                property.description.toLowerCase().includes(word) ||
                property.location.toLowerCase().split(/\s+/).includes(word))
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
    <div>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="sm:hidden bg-black text-white px-4 py-2 rounded-md  mx-auto sm:w-full hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mb-4"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div
        className={`${
          showFilters ? "flex" : "hidden"
        } flex-col md:flex md:flex-row items-start w-[370px] sm:w-full mx-auto md:items-center gap-0 space-y-4 md:space-y-0 md:space-x-4 mb-4`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded-md p-2 w-full md:w-48 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          value={filter.location}
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
          placeholder="Location"
          className="border border-gray-300 rounded-md p-2 w-full md:w-48 focus:outline-none focus:border-blue-500"
        />
        <select
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          className="border border-gray-300 rounded-md p-2 w-full md:w-auto focus:outline-none focus:border-blue-500"
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Villa">Villa</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-2 rounded-md w-full md:w-auto hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          Search
        </button>
        <button
          onClick={clearFilter}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md w-full md:w-auto hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
