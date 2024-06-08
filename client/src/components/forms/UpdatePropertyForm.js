import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { BASE_URL } from "../../utils/propertyData";

const UpdatePropertyForm = ({ property, handleUpdateProperty, onClose }) => {
  const [propertyImages, setPropertyImages] = useState(property.images);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const watchPrice = watch("price", property.price);

  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleAddImageButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = (index) => {
    const updatedNewImages = [...newImages];
    updatedNewImages.splice(index, 1);
    setNewImages(updatedNewImages);
    const updatedImagePreviews = [...imagePreviews];
    updatedImagePreviews.splice(index, 1);
    setImagePreviews(updatedImagePreviews);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("location", data.location);
    formData.append("type", data.type);

    property.images.forEach((imageUrl) => {
      formData.append("images", imageUrl);
    });

    newImages.forEach((image) => {
      formData.append("images", image);
    });

    handleUpdateProperty(property._id, formData)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error updating property:", error);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-5 rounded-md shadow-lg w-[500px] h-[95vh]">
        <FaTimes className="ml-auto cursor-pointer" onClick={onClose} />
        <h2 className="text-2xl font-bold mb-4 text-center">Update Property</h2>
        <div className="overflow-y-scroll h-[80vh]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2 font-bold">
                Title:
              </label>
              <input
                type="text"
                name="title"
                defaultValue={property.title}
                placeholder="Title"
                className={`border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 w-full`}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 font-bold">
                Description:
              </label>
              <textarea
                name="description"
                defaultValue={property.description}
                placeholder="Description"
                className={`border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 w-full`}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block mb-2 font-bold">
                Price:
              </label>
              <input
                type="number"
                name="price"
                defaultValue={property.price}
                placeholder="Price"
                className={`border ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 w-full`}
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 0.01,
                    message: "Price must be greater than zero",
                  },
                })}
              />
              {watchPrice === 0 && (
                <p className="text-red-500 text-sm mt-1">
                  Price cannot be zero
                </p>
              )}
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block mb-2 font-bold">
                Location:
              </label>
              <input
                type="text"
                name="location"
                defaultValue={property.location}
                placeholder="Location"
                className={`border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 w-full`}
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block mb-2 font-bold">
                Type:
              </label>
              <select
                name="type"
                defaultValue={property.type}
                className={`border ${
                  errors.type ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 w-full`}
                {...register("type", { required: "Property type is required" })}
              >
                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Villa">Villa</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap">
              <div className="mb-4">
                <h1 className="font-bold mb-2">Previous images..</h1>
                <div className="flex flex-wrap">
                  {propertyImages.map((image, index) => (
                    <div
                      key={`existing-${index}`}
                      className="mr-2 mb-2 relative"
                    >
                      <img
                        src={`${BASE_URL}/${image}`}
                        alt={`Image ${index}`}
                        className="w-24 h-24 object-cover"
                        onError={(e) => {
                          console.error("Error loading image:", e);
                        }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-red-500">
                  Note: On updation the previous image(s) will be replaced with
                  new image(s) (if any added).
                </p>
              </div>
              {imagePreviews.length > 0 && (
                <div>
                  <h1 className="font-bold mb-2">New images..</h1>
                  <div className="flex flex-wrap">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="mr-2 mb-2 relative">
                        <img
                          src={preview}
                          alt={`New Image ${index}`}
                          className="w-24 h-24 object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full p-1"
                          onClick={() => handleDeleteImage(index)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mb-8">
              <label htmlFor="images" className="block mb-2 font-bold">
                Images:
              </label>
              <div>
                <button
                  type="button"
                  onClick={handleAddImageButtonClick}
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mr-4"
                >
                  Add Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleImageChange}
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mr-4"
              >
                Update
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePropertyForm;
