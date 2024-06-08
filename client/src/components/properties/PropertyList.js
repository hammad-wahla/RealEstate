import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SearchFilter from "../filter/SearchFilter";
import UpdatePropertyForm from "../forms/UpdatePropertyForm";
import AddPropertyForm from "../forms/AddPropertyForm";
import PropertyPopup from "./singleProperty";
import { BASE_URL } from "../../utils/propertyData";
import {
  getProperties,
  createProperty,
  deleteProperty,
  updateProperty,
} from "../../utils/propertyData";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchPropertiesData = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPropertiesData();
  }, []);

  const handleAddPost = async (newProperty) => {
    try {
      const addedProperty = await createProperty(newProperty);
      setProperties((prevProperties) => [...prevProperties, addedProperty]);
      setShowAddPropertyForm(false);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      await deleteProperty(propertyId);
      setProperties(
        properties.filter((property) => property._id !== propertyId)
      );
      setSelectedPropertyId(null);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleUpdate = async (propertyId) => {
    const propertyToUpdate = properties.find(
      (property) => property._id === propertyId
    );
    setSelectedProperty(propertyToUpdate);
    setShowUpdateForm(true);
    setSelectedPropertyId(null);
  };

  const handleUpdateProperty = async (propertyId, updatedPropertyData) => {
    try {
      const updatedProperty = await updateProperty(
        propertyId,
        updatedPropertyData
      );
      setProperties(
        properties.map((property) =>
          property._id === propertyId ? updatedProperty : property
        )
      );
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const toggleDropdown = (propertyId) => {
    setSelectedPropertyId(
      selectedPropertyId === propertyId ? null : propertyId
    );
  };

  const isAdminDashboard = location.pathname === "/admin/dashboard";

  const handleCloseForm = () => {
    setShowAddPropertyForm(false);
  };

  const openPopup = (property) => {
    setSelectedProperty(property);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Property Listings</h1>
        {isAdminDashboard && (
          <button
            onClick={() => setShowAddPropertyForm(true)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
          >
            Add Property
          </button>
        )}
      </div>
      <SearchFilter setProperties={setProperties} />
      {showUpdateForm && selectedProperty && (
        <UpdatePropertyForm
          property={selectedProperty}
          handleUpdateProperty={handleUpdateProperty}
          onClose={() => setShowUpdateForm(false)}
          setSelectedProperty={setSelectedProperty}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-4">
        {properties
          .slice()
          .reverse()
          .map((property) => {
            const descriptionLines = property.description.split("\n");
            const showMoreButton = descriptionLines.length > 1;

            return (
              <div
                key={property._id}
                className="bg-white shadow-lg p-4 relative border border-gray-200 "
              >
                {isAdminDashboard && (
                  <div className="dropdown top-4 right-3 absolute">
                    <button
                      className="dropdown-toggle"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(property._id);
                      }}
                    >
                      <FaEllipsisV />
                    </button>
                    {selectedPropertyId === property._id && (
                      <div className="dropdown-menu flex flex-col gap-1 w-20 rounded-md shadow-md border border-gray-400 py-1 z-30 absolute bg-white right-0">
                        <button
                          className="dropdown-item p-1 hover:bg-gray-200"
                          onClick={() => handleUpdate(property._id)}
                        >
                          Update
                        </button>
                        <button
                          className="dropdown-item p-1 hover:bg-gray-200"
                          onClick={() => handleDelete(property._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                <div className="h-[200px] flex justify-center mb-2">
                  <Carousel showThumbs={false} showStatus={false}>
                    {property.images.map((image, index) => (
                      <div key={index}>
                        <img
                          className="h-[200px]"
                          src={`${BASE_URL}/${image}`}
                          alt={`Property Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => openPopup(property)}
                >
                  <p className="text-gray-700 mb-2">
                    {descriptionLines[0]}
                    {showMoreButton && (
                      <>
                        {" ..."}
                        <button
                          onClick={() => openPopup(property)}
                          className="text-black"
                        >
                          more
                        </button>
                      </>
                    )}
                  </p>
                  <p className="text-lg text-gray-800 mb-2">
                    {" "}
                    Price: ${property.price}
                  </p>
                  <p className="text-gray-600">Location: {property.location}</p>
                </div>
              </div>
            );
          })}
      </div>
      {showAddPropertyForm && (
        <AddPropertyForm
          handleAddPost={handleAddPost}
          onClose={handleCloseForm}
        />
      )}
      {isPopupOpen && selectedProperty && (
        <PropertyPopup property={selectedProperty} onClose={closePopup} />
      )}
    </div>
  );
};

export default PropertyList;
