import React from 'react';
import Classes from './category.module.css';
import { Link } from 'react-router-dom';

function CategoryCard({ data }) {
  console.log("CategoryCard received data:", data);

  return (
    <div className={Classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
