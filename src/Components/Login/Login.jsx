import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorStatusBar, successStatusBar } from "../StatusBars/StatusBars";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isAuthorised } from "../redux/auth";

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // if submited after validation
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token, user } = response?.data;
      dispatch(isAuthorised(true));
      // -------------------
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // ------------------------
      successStatusBar("Logged");
      navigate("/post");
      // ----------------------
    } catch (error) {
      errorStatusBar(error?.response?.data?.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center form-group" style={{marginTop: '1.4rem',textAlign:"center"}}>
          <h2>LOGIN</h2>
        </div>
        <div className="form-group position-relative">
          <span>
            <FontAwesomeIcon icon={faUser} />
          </span>
          <input
          placeholder="E-Mail Address"
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Email address must be a valid address",
              },
            })}
          />
          {errors?.email && (
            <div className="error-message">{errors.email?.message}</div>
          )}
        </div>
        <div className="form-group position-relative">
          <span>
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
          placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { message: "minimum 8 characters", value: 8 },
              maxLength: { message: "maximum 16 characters", value: 16 },
            })}
          />
          {errors?.password && (
            <div className="error-message">{errors.password?.message}</div>
          )}
        </div>
        <div className="form-group" style={{ marginTop: "1.4rem" }}>
          <button type="submit">LOGIN</button>
        </div>
        <div className="form-group text-center">
          <p>Don't have an account?</p>
          <Link to={"/signup"}>
            <p>Sign Up Now</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
