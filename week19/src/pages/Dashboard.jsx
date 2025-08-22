import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { useEffect, useState } from "react";

import { getProducts } from "../services/products";
import deleteVector from "../assets/trash.svg";
import editVector from "../assets/edit.svg";
import styles from "./dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("user");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getProducts({ page, limit: 10 });

        if (result && Array.isArray(result.data)) {
          setProducts(result.data);
          setTotalPages(result.totalPages || 1);
        } else if (Array.isArray(result)) {
          setProducts(result);
          setTotalPages(1);
        } else {
          setError("قالب داده دریافتی نامعتبر است");
          setProducts([]);
        }
      } catch (error) {
        console.error("خطا در دریافت محصولات", error);
        setError("خطا در دریافت محصولات");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const result = await getProducts({ page: 1, limit: 10, name: search });

      if (result && Array.isArray(result.data)) {
        setProducts(result.data);
        setTotalPages(result.totalPages || 1);
      } else if (Array.isArray(result)) {
        setProducts(result);
        setTotalPages(1);
      }
      setPage(1);
    } catch (error) {
      console.error("خطا در جستجو", error);
      setError("خطا در جستجو");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div className={styles.dashContainer}>
        <div className={styles.loading}>در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className={styles.dashContainer}>
      <div className={styles.searchContainer}>
        <button onClick={handleSearch} className={styles.searchBtn}>
          <CiSearch />
        </button>
        <input
          type="text"
          placeholder="جستجوی کالا..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          className={styles.searchInput}
        />
        <span className={styles.userInfo}>
          <h4>{userName}</h4>
          <p>مدیر</p>
        </span>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <CiLogout />
        </button>
      </div>

      <div className={styles.productManage}>
        <div className={styles.manageTitle}>
          <span>
            <LuSettings2 />
          </span>
          <h3>مدیریت کالا</h3>
        </div>
        <button className={styles.addProductBtn}>افزودن محصول</button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
          <button
            onClick={() => window.location.reload()}
            className={styles.retryBtn}
          >
            تلاش مجدد
          </button>
        </div>
      )}

      {products.length === 0 && !loading ? (
        <div className={styles.emptyState}>هیچ محصولی یافت نشد</div>
      ) : (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>نام کالا</th>
                  <th>موجودی</th>
                  <th>قیمت</th>
                  <th>شناسه کالا</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.quantity ?? 0}</td>
                    <td>{(p.price ?? 0).toLocaleString()} هزار تومان</td>
                    <td>{p.id}</td>
                    <td>
                      <button className={styles.actionBtn}>
                        <img
                          src={editVector}
                          alt="ویرایش"
                          width={16}
                          height={16}
                        />
                      </button>
                      <button className={styles.actionBtn}>
                        <img
                          src={deleteVector}
                          alt="حذف"
                          width={16}
                          height={16}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`${styles.paginationDot} ${
                    page === pageNumber ? styles.activeDot : ""
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
