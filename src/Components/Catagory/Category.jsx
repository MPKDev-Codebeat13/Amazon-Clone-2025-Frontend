import React from 'react';
import CategoryCard from './CategoryCard';
import { categoryInfos } from './CategoryFullInfo';
import Classes from './category.module.css';

function Category() {
  return (
    <section className={Classes.category_container}>
      {categoryInfos.map((infos) => (
        <CategoryCard key={infos.name} data={infos} />
      ))}
    </section>
  );
}

export default Category;
