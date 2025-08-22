import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.delete(`${API_URL}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw new Error("لطفاً مجدداً وارد سیستم شوید");
    }
    
    throw new Error(error.response?.data?.message || "خطا در حذف محصول");
  }
};