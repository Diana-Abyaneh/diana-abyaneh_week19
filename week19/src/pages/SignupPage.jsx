import { Link } from "react-router-dom"
import logo from "../assets/Union.svg"

function SignupPage() {
  return (
    <div>
        <img src={logo} alt="botostart Logo" />
        <h3>فرم ثبت نام</h3>
        <input type="text" name="user-name" placeholder="نام کاربری"/>
        <input type="password" name="pass" placeholder="رمز عبور"/>
        <input type="password" name="re-pass" placeholder="تکرار رمز عبور"/>
        <button>ثبت نام</button>
        <Link to="/">حساب کاربری دارید؟ اینجا کلیک کنید.</Link>
    </div>
  )
}

export default SignupPage