import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

const AddPropertyForm = ({ handleAddPost, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);

  const handleAddImageButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    if (value.length > 1 && value.startsWith("0")) {
      value = value.slice(1);
    }

    if (value === "") {
      value = "0";
    }

    setValue("price", value);
  };

  const onSubmit = (data) => {
    console.log("Form data with images:", { ...data, images });
    handleAddPost({ ...data, images });
    reset();
    setImages([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 px-4 bg-opacity-50">
      <div className="bg-white p-5 rounded-md shadow-lg w-[500px] h-[95vh] z-20">
        <FaTimes className="ml-auto cursor-pointer" onClick={onClose} />
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add New Property
        </h2>
        <div className="overflow-y-scroll h-[80vh]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2 font-bold">
                Title:
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                placeholder="Title"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {errors.title && (
                <p className="text-red-600 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 font-bold">
                Description:
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message:
                      "Description should be at least 10 characters long",
                  },
                })}
                placeholder="Description"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {errors.description && (
                <p className="text-red-600 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block mb-2 font-bold">
                Price:
              </label>
              <input
                type="text"
                {...register("price", {
                  required: "Price is required",
                  validate: (value) => value > 0 || "Price cannot be zero",
                })}
                placeholder="Price"
                className="border border-gray-300 rounded-md p-2 w-full"
                onChange={handlePriceChange}
                defaultValue="0"
              />
              {errors.price && (
                <p className="text-red-600 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block mb-2 font-bold">
                Location:
              </label>
              <input
                type="text"
                {...register("location", {
                  required: "Please add property location.",
                })}
                placeholder="Location"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {errors.location && (
                <p className="text-red-600 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block mb-2 font-bold">
                Type:
              </label>
              <select
                {...register("type", {
                  required: "Please specify property type.",
                })}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Villa">Villa</option>
              </select>
              {errors.type && (
                <p className="text-red-600 text-sm">{errors.type.message}</p>
              )}
            </div>
            <div>
              {images.map((file, index) => (
                <div key={index} className="relative inline-block">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover mr-2 mb-2"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-2 bg-red-500 text-white text-sm rounded-full p-1"
                    onClick={() => {
                      const updatedImages = [...images];
                      updatedImages.splice(index, 1);
                      setImages(updatedImages);
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
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
                Add
              </button>
              <button
                type="button"
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

export default AddPropertyForm;
