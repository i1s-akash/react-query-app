import { Product } from "./product.interface";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  } catch (err: any) {
    throw err;
  }
};

export const addProduct = async (payload: Product): Promise<Product> => {
  try {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    return response.json();
  } catch (err: any) {
    throw err;
  }
};
