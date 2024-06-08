import axios from "axios";

export const BASE_URL = "http://localhost:5000";
const API_URL = "/api/properties";

export const getProperties = async (params = {}) => {
  try {
    const response = await axios.get(BASE_URL + API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const createProperty = async (newProperty) => {
  try {
    const formData = new FormData();
    formData.append("title", newProperty.title);
    formData.append("description", newProperty.description);
    formData.append("price", newProperty.price);
    formData.append("location", newProperty.location);
    formData.append("type", newProperty.type);

    newProperty.images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await axios.post(BASE_URL + API_URL, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding property:", error);
    throw error;
  }
};

export const deleteProperty = async (propertyId) => {
  try {
    await axios.delete(`${BASE_URL + API_URL}/${propertyId}`);
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

export const updateProperty = async (propertyId, updatedPropertyData) => {
  try {
    const response = await axios.put(
      `${BASE_URL + API_URL}/${propertyId}`,
      updatedPropertyData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};
