import React from "react";
import { Carousel } from "react-responsive-carousel";
import { FaTimes } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BASE_URL } from "../../utils/propertyData";

const PropertyPopup = ({ property, onClose }) => {
  if (!property) return null;
  const descriptionLines = property.description.split("\n");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-3 rounded-md shadow-lg max-w-2xl w-full relative pb-10">
        <FaTimes className="ml-auto cursor-pointer" onClick={onClose} />
        <div className="overflow-y-scroll px-3 h-[80vh]">
          <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
          <div className="mb-4 flex justify-center h-96">
            <Carousel showThumbs={false} showStatus={false}>
              {property.images.map((image, index) => (
                <div key={index}>
                  <img
                    className="h-96"
                    src={`${BASE_URL}/${image}`}
                    alt={`Property Image ${index + 1}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          {descriptionLines.map((line, index) => (
            <p key={index} className="text-gray-800 mb-2">
              {line}
            </p>
          ))}
          <p className="text-lg text-gray-800 mb-2">Price: ${property.price}</p>
          <p className="text-gray-600">Location: {property.location}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyPopup;
