import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.scss";

interface ICategoryRouteParams {
  category: string;
}

const Category = () => {
  const { category } = useParams<
    keyof ICategoryRouteParams
  >() as ICategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};
export default Category;
