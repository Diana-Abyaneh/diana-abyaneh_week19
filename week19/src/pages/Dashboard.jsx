import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductTable from "../components/ProductTable";

import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const {
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
  } = useProducts();

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchProducts({ search: e.target.value, page: 1 });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>مدیریت کالاها</h1>
        <div>
          <span>خوش آمدی {localStorage.getItem("user")}</span>
          <button onClick={logout}>خروج</button>
        </div>
      </header>

      <div className={styles.actions}>
        <input
          type="text"
          placeholder="جستجوی کالا..."
          value={search}
          onChange={handleSearch}
        />
        <button onClick={() => setShowAddModal(true)}>افزودن محصول</button>
      </div>

      {loading && <p>در حال بارگذاری...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <ProductTable
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

      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          قبلی
        </button>
        <span>
          صفحه {page} از {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          بعدی
        </button>
      </div>

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
