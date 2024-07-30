import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductListStore } from '../../Redux/actions/productThunks';
import { useParams } from 'react-router-dom';

const ProfileFormProductListStore = () => {
  const dispatch = useDispatch();
  const { storeID } = useParams();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (storeID) {
      dispatch(getProductListStore(storeID));
    }
  }, [dispatch, storeID]);

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = (
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.productName}</h2>
            <p>{product.productDescription}</p>
            <p>Price: {product.productPrice}</p>
            <p>Categories: {product.productCategory.join(', ')}</p>
            <img src={product.productImage} alt={product.productName} />
          </li>
        ))}
      </ul>
    );
  } else if (status === 'failed') {
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
