import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../Redux/actions/productThunks';

const ProductDetail = () => {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector((state) => state.products);

  const [productCard, setProductsCard] = useState();
  
  useEffect(() => {
    if (productID) {
      dispatch(getProduct(productID));
      setProductsCard(product);
      console.log(product);
    }
  }, [dispatch, productID]);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && !error && product) {
    content = (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold">{productCard.productName}</h2>
        <p className="text-gray-600">{productCard.productDescription}</p>
        <p className="text-gray-800 font-bold">Price: ${productCard.productPrice}</p>
        <p className="text-gray-600">Categories: {/*product.productCategory.join(', ')*/}</p>
        <img src={product.productImage} alt={productCard.productName} className="mt-4 w-full h-64 object-cover" />
      </div>
    );
  } else if (error) {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      {content}
    </div>
  );
};

export default ProductDetail;
