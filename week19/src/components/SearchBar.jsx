import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { CiSearch, CiLogout } from "react-icons/ci";
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch, userName, onLogout }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") || "");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    setSearchParams({ q: value, page: 1 });
    onSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className={styles.searchContainer}>
      <button onClick={handleSearch} className={styles.searchBtn}>
        <CiSearch />
      </button>
      <input
        type="text"
        placeholder="جستجوی کالا..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className={styles.searchInput}
      />
      <span className={styles.userInfo}>
        <img
          src={`https://avatar.iran.liara.run/username?username=${userName}`}
          alt="avatar"
        />
        <span>
          <h4>{userName}</h4>
          <p>مدیر</p>
        </span>
      </span>
      <button onClick={onLogout} className={styles.logoutBtn}>
        <CiLogout />
      </button>
    </div>
  );
}


export default SearchBar;
