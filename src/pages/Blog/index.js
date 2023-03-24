import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import CategoryCarousel from "../../components/CategoryCarousel";
import { removeProfile } from "../../features/profile/profileSlice";
import "./Blog.css";

function Blog() {
  const [blog, setBlog] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("userToken");
    dispatch(removeProfile());
    navigate("/login");
  }
  return (
    <div className="blog-container">
      <CategoryCarousel setBlog={setBlog} />
      <div className="blogs">
        {blog.length ? (
          blog.map((blogData) => (
            <Card
              key={blogData?.id}
              imgSrc={blogData?.imageUrl}
              title={blogData?.title}
              description={blogData?.description}
            />
          ))
        ) : (
          <EmptyBlog />
        )}
      </div>
    </div>
  );
}

export default Blog;

const EmptyBlog = () => {
  return (
    <div className="empty-blog">
      <h3 className="woof-header">Wooofss !!</h3>
      <p className="nt-found-text">No Blogs Found</p>
    </div>
  );
};
