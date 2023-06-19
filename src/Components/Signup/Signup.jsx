import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faPoo } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { errorStatusBar, successStatusBar } from "../StatusBars/StatusBars";

function Signup() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

const [image,setImage]=useState()
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers required by your API
          },
        }
      );
      successStatusBar("Account created");
      navigate('/login')
    } catch (error) {
      errorStatusBar(error?.response?.data?.message || error?.message );
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center form-group">
          <h2>SIGNUP</h2>
        </div>
        <div className="form-group position-relative">
          <span>
            <FontAwesomeIcon icon={faPoo} />
          </span>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name",{required:'Name is required',minLength:{message:'minimum 3',value:3},maxLength:{message:'max 40',value:40}})}
          />
          {errors?.name && (
            <div className="error-message">{errors.name?.message}</div>
          )}
        </div>
        <div className="form-group position-relative">
          <span>
            <FontAwesomeIcon icon={faUser} />
          </span>
          <input
            type="email"
            placeholder="E-Mail"
            {
              ...register("email",{required:"Email is required",pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g ,message:'Email address must be a valid address'}})
            }
          
          />
             {errors?.email && (
            <div className="error-message">{errors?.email?.message}</div>
          )}
        </div>
        <div className="form-group position-relative">
          <span>
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type="password"
            placeholder="Password"
            {
              ...register("password",{required:"Password is required",minLength:{message:'min 8',value:8},maxLength:{message:'max 16',value:16}})
            }
          />
          {errors?.password && (
            <div className="error-message">{errors?.password?.message}</div>
          )}



        </div>

        {/* <input type="file" onChange={(e)=>setImage(e.target.files[0])} required name="picture"/> */}
        {/* <div className="form-group position-relative">
          <span>
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input type="password" placeholder="Confirm Password"
          {...register("repeat_password",{required:true,} )}
          />
        </div> */}
        <div className="form-group" style={{ marginTop: "1.4rem" }}>
          <button type="submit">REGISTER</button>
        </div>
        <div className="form-group text-center">
          <p>Already have an account?</p>
          <Link to={"/login"}>
            <p>LogIn Now</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
