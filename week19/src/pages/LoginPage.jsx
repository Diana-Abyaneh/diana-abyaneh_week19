import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { loginUser } from "../services/auth";
import styles from "./loginPage.module.css";
import logo from "../assets/Union.svg";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data.username, data.password);

      localStorage.setItem("token", result.token);

      const decoded = jwtDecode(result.token);
      localStorage.setItem("user", decoded.username);

      alert("ورود با موفقیت انجام شد!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("خطا در ورود. دوباره تلاش کنید.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <header>
        <h1>بوت کمپ بوتواستارت</h1>
      </header>

      <div className={styles.formContainer}>
        <div className={styles.head}>
          <img src={logo} alt="Botostart Logo" />
          <h3>فرم ورود</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsContainer}>
            <input
              type="text"
              placeholder="نام کاربری"
              {...register("username", { required: "نام کاربری الزامی است" })}
            />
            {errors.username && (
              <span className={styles.error}>{errors.username.message}</span>
            )}

            <input
              type="password"
              placeholder="رمز عبور"
              {...register("password", {
                required: "رمز عبور الزامی است",
                minLength: {
                  value: 6,
                  message: "رمز باید حداقل ۶ کاراکتر باشد",
                },
              })}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <button type="submit">ورود</button>
        </form>
        <span className={styles.link}>
          <Link to="/signup">ایجاد حساب کاربری!</Link>
        </span>
      </div>
    </>
  );
}

export default LoginPage;
