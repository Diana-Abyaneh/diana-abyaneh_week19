import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { registerUser } from "../services/auth";
import logo from "../assets/Union.svg";
import styles from "./signupPage.module.css";

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data.username, data.password);
      alert("ثبت نام با موفقیت انجام شد!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      if (error.message?.includes("exists")) {
        alert("نام کاربری از قبل وجود دارد.");
      } else {
        alert("خطا در ثبت نام. دوباره تلاش کنید.");
      }
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
          <img src={logo} alt="botostart Logo" />
          <h3>فرم ثبت نام</h3>
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

            <input
              type="password"
              placeholder="تکرار رمز عبور"
              {...register("confirmPassword", {
                required: "تکرار رمز عبور الزامی است",
                validate: (value) =>
                  value === watch("password") || "رمزها مطابقت ندارند",
              })}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button type="submit">ثبت نام</button>
        </form>
        <span className={styles.link}>
          <Link to="/login">حساب کاربری دارید؟ اینجا کلیک کنید.</Link>
        </span>
      </div>
    </>
  );
}

export default SignupPage;
