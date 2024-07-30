import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductListUser } from '../../Redux/actions/productThunks';

const ProfileFormProductListUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userID } = user || {};
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (userID) {
      dispatch(getProductListUser(userID));
    }
  }, [dispatch, userID]);

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

export default ProfileFormProductListUser;
