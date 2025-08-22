import { useNavigate } from "react-router-dom";
function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("token", "");
        navigate("/login")
    }
  return (
    <div>
        <h1>به داشبورد خوش آمدید.</h1>
        <button onClick={handleLogout}>خروج از حساب کاربری</button>
    </div>
  );
}

export default Dashboard