import React, { useState, useEffect } from "react";
import { getBlog, getCategories } from "./../Helper/Auth";
import "./CategoryCarousel.css";
import Card from "./Card";

function CategoryCarousel({ setBlog }) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    async function getAll() {
      const categoryData = await getCategories();
      setCategories(categoryData);
      const firstBlog = await getBlog(categoryData?.[0]?.slug);
      setBlog(firstBlog);
    }
    getAll();
  }, []);

  async function handleClick(target) {
    setSelected(target?.id);
    const slugData = target.slug;
    async function getBlogData() {
      const blogData = await getBlog(slugData);
      setBlog(blogData);
    }
    getBlogData();
  }

  return (
    <div className="category-carousel">
      <div className="scroll-menu">
        {categories?.map((data, index) => {
          let activeCss;
          if (selected) {
            if (selected === data?.id) activeCss = "active-selected";
          } else {
            if (index === 0) activeCss = "active-selected";
          }
          return (
            <div
              key={data?.id}
              className={`item-container ${activeCss}`}
              onClick={(e) => handleClick(data)}
            >
              <img src={data?.imageUrl} alt="img" className="item-img" />
              <p className="item">{data?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryCarousel;
