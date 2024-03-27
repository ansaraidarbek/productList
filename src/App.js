import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products', {
        headers: {
          'app-id': '601f6b745d6ebfc98174820f'
        }
      });
      const data = await response.json();
      const products = data.products.slice(0, 5);
      const newProducts = products.map(el => {
        return {image:el.images[0], ...el}
      })
      setProducts(newProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      title: titleRef.current.value,
      brand: brandRef.current.value,
      image: imageRef.current.value,
      price: priceRef.current.value,
      discountPercentage: discountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value
    };
    setProducts([...products, newProduct]);
    setShowModal(false);
    clearInputs();
  };

  const clearInputs = () => {
    titleRef.current.value = '';
    brandRef.current.value = '';
    imageRef.current.value = '';
    priceRef.current.value = '';
    discountRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
  };

  const titleRef = useRef(null);
  const brandRef = useRef(null);
  const imageRef = useRef(null);
  const priceRef = useRef(null);
  const discountRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);

  return (
    <div className="container">
      <h1>Product Cards</h1>
      <div className="product-cards">
        {products.map((product, index) => (
          <div className="card" key={index}>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.brand}</p>
            <p>Price: {product.price}</p>
            <p>Discount: {product.discountPercentage}</p>
            <p>Category: {product.category}</p>
            <p>{product.description}</p>
          </div>
        ))}
        <button className="add-btn" onClick={() => setShowModal(true)}>Add Product</button>
      </div>
      {showModal && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add New Product</h2>
            <input type="text" ref={titleRef} placeholder="Title" />
            <input type="text" ref={brandRef} placeholder="Brand" />
            <input type="text" ref={imageRef} placeholder="Image URL" />
            <input type="text" ref={priceRef} placeholder="Price" />
            <input type="text" ref={discountRef} placeholder="Discount" />
            <input type="text" ref={descriptionRef} placeholder="Description" />
            <input type="text" ref={categoryRef} placeholder="Category" />
            <button onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
