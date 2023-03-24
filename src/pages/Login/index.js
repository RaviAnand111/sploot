import React, { useState, useEffect } from "react";
import { EyeIcon, CrossEyeIcon } from "../../asset";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProfile } from "../../features/profile/profileSlice";
import "./login.css";
import { getUserDetail, getUserToken } from "../../Helper/Auth";

function Login() {
  const dispatch = useDispatch();

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [showPasswordToggle, setShowPasswordToggle] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getUserToken();
    const goToBlog = () => navigate("/blog");
    if (token) goToBlog();
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && canSubmit) {
      submitForm();
    }
  }, [formErrors, canSubmit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setCanSubmit(true);
  }

  function handleShowPassword() {
    setShowPasswordToggle((toggle) => !toggle);
  }

  function validate(values) {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email cannot be blank";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Password cannot be blank";
    } else if (values.password.length <= 4) {
      errors.password = "Password must be more than 4 characters";
    }

    return errors;
  }

  async function submitForm() {
    if (Object.keys(formErrors).length === 0) {
      let formData = {
        username: formValues.email,
        password: formValues.password,
      };
      const res = await fetch(
        " https://api-staging-v2.sploot.space/api/v2/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const loginData = await res.json();
      if (loginData.statusCode === 200) {
        localStorage.setItem("userToken", loginData.data.data.authToken);
        const userData = await getUserDetail();
        dispatch(addProfile(userData));
        navigate("/blog", { replace: true });
      }
    }
  }

  return (
    <div className="login-container">
      <div className="textcontainer">
        <p className="heading">Making You A</p>
        <p className="subheading">Better Pet Parent</p>
      </div>
      <div className="login">
        <h3>Login</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <input
              name="email"
              type="text"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email"
              className="input"
            />
            {formErrors.email && <p className="error">{formErrors.email}</p>}
          </div>
          <div className="password-input">
            <input
              name="password"
              type={showPasswordToggle ? "text" : "password"}
              value={formValues.password}
              onChange={handleChange}
              placeholder="Password"
              className="input"
            />
            {showPasswordToggle ? (
              <CrossEyeIcon className="eye-icon" onClick={handleShowPassword} />
            ) : (
              <EyeIcon className="eye-icon" onClick={handleShowPassword} />
            )}
            {formErrors.password && (
              <p className="error">{formErrors.password}</p>
            )}
          </div>
          <button type="submit" className="loginbtn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
