import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../contextApi/ProductContext.jsx";
import {ProductCard }from "../components/ProductCard.jsx";

const Home = () => {
  const { fetchProducts, products } = useProductContext();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Current Products
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-xl text-center font-semibold text-gray-500">
            No products found.{" "}
            <Link to="/create">
              <span className="text-blue-500 hover:underline">Create a product</span>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export {Home};
