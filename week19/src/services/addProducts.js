// services/addProduct.js
import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const addProduct = async (productData) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.post(API_URL, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw new Error("لطفاً مجدداً وارد سیستم شوید");
    }
    
    throw new Error(error.response?.data?.message || "خطا در افزودن محصول");
  }
};