import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductListStore } from '../../Redux/actions/productThunks';
import { useParams } from 'react-router-dom';

const ProfileFormProductListStore = () => {
  const dispatch = useDispatch();
  const { storeID } = useParams();
  const { products, isLoading, error } = useSelector((state) => state.products);

  const [ storeProductCards, setStoreProductCards ] = useState([]);

  useEffect(() => {
    if (products) {
      setStoreProductCards(products);
    }
  }, [products]);

  useEffect(() => {
    if (storeID) {
      console.log(storeID);
      dispatch(getProductListStore(storeID));
    }
  }, [dispatch, storeID]);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && !error) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {storeProductCards.map((product) => (
        <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold">{product.productName}</h2>
          <p className="text-gray-600">{product.productDescription}</p>
          <p className="text-gray-800 font-bold">Price: ${product.productPrice}</p>
          <p className="text-gray-600">Categories: {product.productCategory.join(', ')}</p>
          <img src={product.productImage} alt={product.productName} className="mt-4 w-full h-48 object-cover" />
        </div>
      ))}
    </div>
    );
  } else if (error) {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Product List</h1>
      {content}
    </div>
  );
};

export default ProfileFormProductListStore;
