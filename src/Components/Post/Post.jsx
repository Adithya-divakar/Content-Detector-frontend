import React, { useEffect, useState } from "react";
import "./Post.css";
import Posts from "./Posts";
import axios from "axios";
import { errorStatusBar, successStatusBar } from "../StatusBars/StatusBars";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsReducer } from "../redux/userData.js";
import { useForm } from "react-hook-form";
import { getAllPost } from "../redux/posts.js";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

function Post(props) {
  // form validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // ---------------

  // --------------------------------
  const dispatch = useDispatch();
  // ---------------------------------------

  // -------------------------------
  const { userData } = useSelector((state) => state.userData);
  const { posts } = useSelector((state) => state.posts);
  const { isAuth } = useSelector((state) => state.authentication);
  // -------------------------------

  // fetch all posts
  const getAllPosts = async () => {
    try {
      let response = await axios.get(`http://localhost:3001/posts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(getAllPost(response?.data));
    } catch (error) {
      errorStatusBar(error?.response?.data?.message || error?.message);
    }
  };
  // ----------------------

  // user data fetch
  const userDataAPI = async () => {
    try {
      const user_id = JSON.parse(localStorage.getItem("user"))?._id;

      let response = await axios.get(`http://localhost:3001/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(userDetailsReducer(response?.data));
    } catch (error) {
      errorStatusBar(error?.response?.data?.message || error?.message);
    }
  };
  // --------------------------

  // IF user posting
  const PostingContent = async (data) => {
    try {
      const user_id = JSON.parse(localStorage.getItem("user"))?._id;
      let response = await axios.post(
        `http://localhost:3001/users/post/${user_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      reset()
      successStatusBar("Posted");
      getAllPosts();
    } catch (error) {
      errorStatusBar(error?.response?.data?.message || error?.message);
    }
  };
  // -------------------------

  const onSubmit = (data) => {
    PostingContent(data);
    

  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    if (!isAuth) return (window.location.href = "/");
    userDataAPI();
    getAllPosts();
   
  }, []);

  return (
    <>
      <div>
        <div className="post-container">
          <div
            className="post-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p style={{ backgroundColor: "#4267b2", color: "white" }}>
              Detection of abusive/violent content
            </p>
            <div className="" style={{ display: "flex" }}>
              <p style={{ margin: "0px 5px", color: "white" }}>
                {userData?.name}
              </p>
              <p style={{ margin: "0px 5px", color: "white" }} onClick={logout}>
                Logout
              </p>
            </div>
          </div>
          <div className="post-body">
            {posts?.map((posts) => (
              <Posts key={posts._id} posts={posts} />
            ))}
          </div>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="post-footer">
              <input
                {...register("content", {
                  required: "is empty",
                  minLength: { message: "minium 6", value: 6 },
                  maxLength: { message: "max 200", value: 200 },
                })}
                type="text"
                placeholder="Type here..."
              />
              {errors?.content && (
                <div className="error-message">{errors.content?.message}</div>
              )}
              <button type="submit">Sent</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Post;
