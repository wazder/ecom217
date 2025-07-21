import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    categoryId: '',
    base64Image: ''
  });

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProduct({
          ...newProduct,
          base64Image: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        categoryId: '',
        base64Image: ''
      });
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8080/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.categoryId.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>Products</h2>
        <div className="user-info">
          Welcome, {user.firstName} {user.lastName}
        </div>
      </div>

      <div className="products-controls">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-product-btn"
        >
          {showAddForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showAddForm && (
        <div className="add-product-form">
          <h3>Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Stock Quantity:</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={newProduct.stockQuantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Category:</label>
                <select
                  name="categoryId"
                  value={newProduct.categoryId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            
            <button type="submit" className="submit-btn">Add Product</button>
          </form>
        </div>
      )}

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>
                  {product.base64Image && (
                    <img 
                      src={product.base64Image} 
                      alt={product.name}
                      className="product-image"
                    />
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.stockQuantity}</td>
                <td>{product.categoryName}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;