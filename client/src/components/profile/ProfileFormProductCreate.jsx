import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../Redux/actions/productThunks';
import { useParams } from 'react-router-dom';

const ProfileProductForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userID, username } = user || {};
  const { store }  = useSelector((state) => state.stores);
  const { storeName } = store;
  const { storeID } = useParams();

  const [productData, setProductData] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productCategory: [],
    productImage: ''
  });

  const [message, setMessage] = useState('');
  const [formValidity, setFormValidity] = useState(true);

  useEffect(() => {
    setMessage('');
  }, [productData]);

  const sanitizeInput = (input) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return input.replace(reg, (match) => map[match]);
  };

  const containsSanitizableCharacters = (input) => /[&<>"'/]/.test(input);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('productCategory')) {
      const index = parseInt(name.split('_')[1]);
      setProductData((prev) => {
        const newCategories = [...prev.productCategory];
        newCategories[index] = value;
        return { ...prev, productCategory: newCategories };
      });
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addCategoryField = () => {
    setProductData((prev) => ({
      ...prev,
      productCategory: [...prev.productCategory, '']
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = [
      productData.productName,
      productData.productPrice,
      productData.productDescription,
      productData.productImage
    ];

    if (fields.some(field => containsSanitizableCharacters(field))) {
      setMessage('Input contains invalid characters. ("&", "<", ">", "/")');
      setFormValidity(false);
      return;
    }

    if (fields.some(field => !field)) {
      setMessage('Please fill out all fields.');
      setFormValidity(false);
      return;
    }

    setFormValidity(true);

    if (formValidity) {
      const sanitizedData = {
        productName: sanitizeInput(productData.productName),
        productPrice: sanitizeInput(productData.productPrice),
        productDescription: sanitizeInput(productData.productDescription),
        productCategory: productData.productCategory.map(category => sanitizeInput(category)),
        productImage: sanitizeInput(productData.productImage)
      };

      dispatch(createProduct(
        {
          ...sanitizedData,
          Store: {
            storeID: storeID,
            storeName: storeName,
          },
          User: {
            userID: userID,
            username: username 
          },
        }))
        .unwrap()
        .then((newProduct) => {
          setMessage('Product created successfully');
          setProductData({
            productName: newProduct.productName,
            productPrice: newProduct.productPrice,
            productDescription: newProduct.productDescription,
            productCategory: newProduct.productCategory,
            productImage: newProduct.productImage
          });
          console.log(newProduct);
        })
        .catch((error) => setMessage(`Failed to create product: ${error.message}`));
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-600">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Product Name"
            value={productData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="productPrice" className="block mb-2 text-sm font-medium text-gray-600">Product Price:</label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            placeholder="Product Price"
            value={productData.productPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="productDescription" className="block mb-2 text-sm font-medium text-gray-600">Product Description:</label>
          <textarea
            id="productDescription"
            name="productDescription"
            placeholder="Product Description"
            value={productData.productDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="productCategory" className="block mb-2 text-sm font-medium text-gray-600">Product Category:</label>
          {productData.productCategory.map((category, index) => (
            <input
              key={index}
              type="text"
              id={`productCategory_${index}`}
              name={`productCategory_${index}`}
              placeholder={`Product Category ${index + 1}`}
              value={category}
              onChange={handleChange}
              required
            />
          ))}
          {productData.productCategory.length < 3 && (
            <button type="button" onClick={addCategoryField} className="mt-2 bg-green-500 text-white py-1 px-2 rounded">
              Add Category
            </button>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="productImage" className="block mb-2 text-sm font-medium text-gray-600">Product Image URL:</label>
          <input
            type="text"
            id="productImage"
            name="productImage"
            placeholder="Product Image URL"
            value={productData.productImage}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Create Product</button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </form>
  );
};

export default ProfileProductForm;
