import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

import ProductsTable from "../components/ProductsTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal";

import setting from "../assets/setting-3.svg";
import styles from "./dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    products,
    totalPages,
    loading,
    error,
    fetchProducts,
    handleAdd,
    handleEdit,
    handleDelete,
  } = useProducts();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const search = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    fetchProducts({ search, page });
  }, [searchParams]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <SearchBar
        onSearch={(q) => fetchProducts({ search: q, page: 1 })}
        userName={localStorage.getItem("user")}
        onLogout={logout}
      />

      <div className={styles.productManage}>
        <span className={styles.manageTitle}>
          <img src={setting} alt="setting icon" />
          <h3>مدیریت کالا</h3>
        </span>
        <button className={styles.addProductBtn}>افزودن محصول</button>
      </div>
      {loading && <p>در حال بارگذاری...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <ProductsTable
        products={products}
        onEdit={(p) => {
          setSelectedProduct(p);
          setShowEditModal(true);
        }}
        onDelete={(p) => {
          setSelectedProduct(p);
          setShowDeleteModal(true);
        }}
      />

      <Pagination totalPages={totalPages} />

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAdd}
        />
      )}

      {showEditModal && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onSubmit={(updated) => handleEdit(selectedProduct.id, updated)}
        />
      )}

      {showDeleteModal && (
        <DeleteProductModal
          product={selectedProduct}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDelete(selectedProduct.id)}
        />
      )}
    </div>
  );
}

export default Dashboard;
