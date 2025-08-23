import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { addProduct } from "../services/addProducts";
import { editProduct } from "../services/editProduct";
import { deleteProduct } from "../services/deleteProduct";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async ({ search = "", page = 1, limit = 10 } = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProducts({ page, limit, name: search });

      if (result?.data) {
        setProducts(result.data);
        setTotalPages(result.totalPages || 1);
      } else {
        setProducts(Array.isArray(result) ? result : []);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message || "خطا در دریافت محصولات");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (product) => {
    await addProduct(product);
    await fetchProducts({ page });
  };

  const handleEdit = async (id, product) => {
    await editProduct(id, product);
    await fetchProducts({ page });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await fetchProducts({ page });
  };

  useEffect(() => {
    fetchProducts({ page });
  }, [page]);

  return {
    products,
    page,
    setPage,
    totalPages,
    loading,
    error,
    fetchProducts,
    handleAdd,
    handleEdit,
    handleDelete,
  };
}
