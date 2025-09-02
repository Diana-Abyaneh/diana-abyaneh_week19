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
    fetchProducts,
    handleAdd,
    handleEdit,
    handleDelete,
    page,
    setPage,
    search,
    setSearch,
  } = useProducts();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    setSearch(query);
    setPage(pageParam);
    fetchProducts({ searchParam: query, pageParam });
  }, [searchParams]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  return (
    <div className={styles.container}>
      <SearchBar
        userName={localStorage.getItem("user")}
        onLogout={logout}
        onSearch={(q) => {
          setSearch(q);
          fetchProducts({ searchParam: q, pageParam: 1 });
        }}
      />

      <div className={styles.productManage}>
        <span className={styles.manageTitle}>
          <img src={setting} alt="setting icon" />
          <h3>مدیریت کالا</h3>
        </span>
        <button
          className={styles.addProductBtn}
          onClick={() => setShowAddModal(true)}
        >
          افزودن محصول
        </button>
      </div>

      <ProductsTable
        products={products}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}

      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onConfirm={async (newProduct) => {
          await handleAdd(newProduct);
          setShowAddModal(false);
        }}
      />

      {selectedProduct && (
        <EditProductModal
          isOpen={showEditModal}
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          onConfirm={async (updatedProduct) => {
            await handleEdit(selectedProduct.id, updatedProduct);
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {selectedProduct && (
        <DeleteProductModal
          isOpen={showDeleteModal}
          product={selectedProduct}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
          onConfirm={async (id) => {
            await handleDelete(id);
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;
