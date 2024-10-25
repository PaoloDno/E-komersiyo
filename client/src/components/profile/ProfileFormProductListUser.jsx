import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductListUser } from '../../Redux/actions/productThunks';
import { useNavigate } from 'react-router-dom';

const ProfileFormProductListStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { userID, username } = user || {}; 
  const { products, isLoading, error } = useSelector((state) => state.products);

  const [productCards, setProductCards] = useState([]);

  useEffect(() => {
    if (products) {
      dispatch(getProductListUser(userID));
    }
  }, [dispatch, userID]);

  useEffect(() => {
    if (products) {
      setProductCards(products);
    }
  }, [products]);

  const handleView = (productID) => {
    console.log(productID)
    navigate(`/profile/getProduct/${productID}`);
  };

  const handleEdit = (productID) => {
    navigate(`/profile/getProduct/${productID}`);
  };

  const handleDelete = (productID) => {
    navigate(`/profile/getProduct/${productID}`);
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && !error) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h1>{username}</h1>
        </div>
        <div>
          
        </div>
        {productCards.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold">{product.productName}</h2>
            <p className="text-gray-600">{product.productDescription}</p>
            <p className="text-gray-800 font-bold">Price: ${product.productPrice}</p>
            <p className="text-gray-600">Categories: {product.productCategory.join(', ')}</p>
            <img src={product.productImage} alt={product.productName} className="mt-4 w-full h-48 object-cover" />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleView(product._id)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(product._id)}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (error) {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {content}
    </div>
  );
};

export default ProfileFormProductListStore;
