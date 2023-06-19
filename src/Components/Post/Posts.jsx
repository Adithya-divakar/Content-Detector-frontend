import React from "react";
import Post from "./Post";

function Posts(props) {
    const {content,name} = props?.posts
  return (
    <>
      <div className="posting-container">
        <div className="first-section">
          <p>{name}</p>
        </div>
        <div className="content-section">
          <p>{content}</p>
        </div>
        {/* <div className="image-section">
        { posting_picture&& <img
            src={posting_picture}
            width={"200px"}
            alt=""
          />}
        </div> */}
      </div>
    </>
  );
}

export default Posts;
