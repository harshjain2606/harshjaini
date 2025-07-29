import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

const BASE_URL = "http://localhost:8080/api/v1/product";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}`);
        //  console.log(res)
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Fetch products error:", error.message);
    }
  };

  // Create a new product
  const createProduct = async (newProduct) => {
    const { name, price, image } = newProduct;
      
    if (!name || !price || !image) {
      return { success: false, message: "All fields are required" };
    }
       console.log(newProduct)
    try {
      const res = await fetch(`${BASE_URL}/createproduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
          console.log(data)
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to create product");
      }

      setProducts((prev) => [...prev, data.data]);
      return { success: true, message: "Product created" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Update an existing product
  const updateProduct = async (pid, updatedProduct) => {
    try {
      const res = await fetch(`${BASE_URL}/updateproduct/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Update failed" };
      }

      setProducts((prev) =>
        prev.map((p) => (p._id === pid ? data.data : p))
      );

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Delete a product
  const deleteProduct = async (pid) => {
    try {
      const res = await fetch(`${BASE_URL}/deleteproduct/${pid}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Delete failed" };
      }

      setProducts((prev) => prev.filter((p) => p._id !== pid));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
