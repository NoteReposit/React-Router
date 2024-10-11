import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';

import '../css/Products.css';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    const { id, name, price, description } = newProduct;

    // ตรวจสอบว่าทุกฟิลด์ไม่เป็นค่าว่างก่อนเพิ่มสินค้า
    if (!id || !name || !price || !description) {
      alert('Please fill in all fields');
      return;
    }

    // Dispatch เพิ่มสินค้าใหม่
    dispatch(addProduct({
      id: parseInt(id), // แปลงค่า id ให้เป็น integer
      name,
      price: `$${price}`, // ใช้การเชื่อมสตริงธรรมดาเพื่อเพิ่มสัญลักษณ์ $
      description
    }));

    // Reset ฟอร์มหลังเพิ่มสินค้า
    setNewProduct({
      id: '',
      name: '',
      price: '',
      description: ''
    });
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="container">
      <h2>Product List</h2>
      <ul className="product-list">
        {productList.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name} - {product.price}
            </Link>
            <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className="form-container">
        <h2>Add a New Product</h2>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={newProduct.id}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
}

export default Products;