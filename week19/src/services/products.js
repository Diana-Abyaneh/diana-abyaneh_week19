import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const getProducts = async ({ page = 1, limit = 10, name = "" } = {}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
      params: { 
        page, 
        limit,
        name 
      }
    });
    return response.data;
    
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};