import React, { useState } from 'react';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    description: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.quantity) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      description: formData.description
    };

    setProducts(prev => [...prev, newProduct]);
    
    // Reset form
    setFormData({
      name: '',
      price: '',
      quantity: '',
      description: ''
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = products.reduce((sum, product) => {
      return sum + (product.price * product.quantity);
    }, 0);
    
    const totalItems = products.reduce((sum, product) => {
      return sum + product.quantity;
    }, 0);

    return {
      subtotal: subtotal.toFixed(2),
      totalItems
    };
  };

  const { subtotal, totalItems } = calculateTotals();

  // Checkout Screen
  if (showCheckout) {
    return (
      <div className="shopping-cart-container">
        <div className="cart-header">
          <h1>Checkout</h1>
        </div>

        <div className="checkout-section">
          <button className="back-button" onClick={handleBackToCart}>
            ← Back to Cart
          </button>

          <div className="checkout-content">
            <h2>Order Summary</h2>
            <div className="checkout-products">
              {products.map(product => (
                <div key={product.id} className="checkout-item">
                  <div className="checkout-item-info">
                    <h3>{product.name}</h3>
                    {product.description && (
                      <p className="checkout-item-description">{product.description}</p>
                    )}
                  </div>
                  <div className="checkout-item-details">
                    <span>${product.price.toFixed(2)} × {product.quantity}</span>
                    <span className="checkout-item-total">
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary">
              <div className="checkout-summary-row">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="checkout-summary-row">
                <span>Total Products:</span>
                <span>{products.length}</span>
              </div>
              <div className="checkout-summary-row checkout-total">
                <span>Total Amount:</span>
                <span>${subtotal}</span>
              </div>
            </div>

            <button className="complete-checkout-button">
              Complete Purchase
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Shopping Cart Screen
  return (
    <div className="shopping-cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
      </div>

      <div className="add-product-section">
        <h2>Add Product</h2>
        <form onSubmit={handleAddProduct} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="1"
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description (optional)"
              rows="3"
            />
          </div>

          <button type="submit" className="add-button">
            Add to Cart
          </button>
        </form>
      </div>

      <div className="cart-list-section">
        <h2>Cart Items ({products.length})</h2>
        {products.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Add products above!</p>
        ) : (
          <>
            <div className="product-list">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    {product.description && (
                      <p className="product-description">{product.description}</p>
                    )}
                    <div className="product-details">
                      <span className="price">${product.price.toFixed(2)}</span>
                      <span className="quantity">Qty: {product.quantity}</span>
                      <span className="total">
                        Total: ${(product.price * product.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDeleteProduct(product.id)}
                    aria-label="Delete product"
                  >
                    <span className="delete-icon">×</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span className="summary-label">Total Items:</span>
                <span className="summary-value">{totalItems}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Total Products:</span>
                <span className="summary-value">{products.length}</span>
              </div>
              <div className="summary-row subtotal-row">
                <span className="summary-label">Subtotal:</span>
                <span className="summary-value">${subtotal}</span>
              </div>
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
