import React, { useState, useEffect } from "react";
import "./SignUp.css";
import {
  checkIsEmpty,
  isEmail,
  validateLengthPassword,
  validatePasswords,
} from "../../../utils/authValidators";
import Alerts from "../../../components/Alerts";
import * as API from "../../../utils/api";
import Swal from "sweetalert2";
import { isAuthenticated } from "../../../utils/auth";
import Header from "../../../components/Header";
export default function SignUp(props) {
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      props.history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      console.log("user");
      props.history.push("/dashboard");
    }
  }, [props.history]);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    loading: false,
  });
  const [authErrors, setAuthErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAuthData({
      ...authData,
      [name]: value,
    });
    setAuthErrors({
      ...authErrors,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setAuthData({
      ...authData,
      loading: true,
    });
    if (!checkIsEmpty(authData.username)) {
      return setAuthErrors({
        ...authErrors,
        username: "Username cannot be empty!",
      });
    }
    if (!isEmail(authData.email)) {
      return setAuthErrors({
        ...authErrors,
        email: "Email must be in correct format!",
      });
    }
    if (!validateLengthPassword(authData.password, 8)) {
      return setAuthErrors({
        ...authErrors,
        password: "Password should be at least 8 characters!",
      });
    }
    if (!validatePasswords(authData.password, authData.confirmPassword)) {
      return setAuthErrors({
        ...authErrors,
        confirmPassword: "Passwords are not the same!",
      });
    }

    const data = {
      username: authData.username,
      email: authData.email,
      password: authData.password,
    };
    API.signUpUser(data)
      .then((res) => {
        console.log(res);
        setAuthData({
          ...authData,
          username: "",
          email: "",
          password: "",
          confirmPassword: "",

          loading: false,
        });
        Swal.fire(
          "Success!!",
          "User has been succesfully registered!.",
          "success"
        );
      })
      .catch((err) => {
        setAuthData({
          ...authData,
          loading: false,
        });
        const message = err.response && err.response.data.errorrMessage;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      });
  };

  return (
    <>
      <Header />
      <div className="container auth-wrapper">
        <div className="col-md-8 mt-5 px-4 py-4">
          <form>
            <div class="mb-3">
              <label htmlFor="exampleInputEmail1" class="form-label">
                Username
              </label>
              <input
                type="text"
                class="form-control auth-inputs"
                name="username"
                value={authData.username}
                onChange={handleFormChange}
              />
              {authErrors.username && (
                <Alerts errorrMessage={authErrors.username} />
              )}

              <label htmlFor="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control auth-inputs"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={authData.email}
                onChange={handleFormChange}
              />
              {authErrors.email && <Alerts errorrMessage={authErrors.email} />}
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control auth-inputs"
                id="exampleInputPassword1"
                name="password"
                value={authData.password}
                onChange={handleFormChange}
              />
              {authErrors.password && (
                <Alerts errorrMessage={authErrors.password} />
              )}

              <label htmlFor="exampleInputPassword1" class="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                class="form-control auth-inputs"
                id="exampleInputPassword1"
                name="confirmPassword"
                value={authData.confirmPassword}
                onChange={handleFormChange}
              />
              {authErrors.confirmPassword && (
                <Alerts errorrMessage={authErrors.confirmPassword} />
              )}
            </div>

            <button type="submit" class="btn purple-btn" onClick={onSubmit}>
              {authData.loading ? (
                <>
                  <span className="mr-2">Loading...</span>
                  <div
                    class="spinner-border text-white"
                    style={{ width: 20, height: 20 }}
                    role="status"
                  />
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
