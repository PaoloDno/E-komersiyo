import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserStores, fetchUsersStore } from "../../Redux/actions/storeThunks";
import defaultImg from "../../assets/images/imageDefault.png";

const ProfileFormStoreDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { userID } = user || {};
  
  const { stores, store, isLoading } = useSelector((state) => state.stores);
  
  const [error, setError] = useState('');
  const { storeID } = useParams();


  const [pageStore, setPageStore] = useState({
    storeName: '',
    storeOwner: {
      storeOwnerID: '',
      storeOwnerName: ''
    },
    storeDescription: '',
    storeProfileImage: '',
    storeRating: '',
    verified: '',
    OwnerRequestToDelete: '',
    storeReports: '',
    storeReviews: ''
  });

  useEffect(() => {
    if (storeID) {
      dispatch(fetchUsersStore(storeID))
        .unwrap()
        .then((fetchedStore) => {
          setPageStore(fetchedStore);
          setError('');
        })
        .catch((err) => setError(err.message));
    }
  }, [dispatch, storeID]);

  useEffect(() => {
    if (userID) {
      dispatch(fetchUserStores(userID))
        .unwrap()
        .then((fetchedStores) => {
          setError('');
        })
        .catch((err) => setError(err.message));
    }
  }, [dispatch, userID]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="store-dashboard">
      <h1>{pageStore.storeName || "Loading..."}</h1>
      <img src={defaultImg} alt={`${pageStore.storeName || "store name"} Profile`} />
      <p>{pageStore.storeDescription || "Loading..."}</p>
      <div>
        <h2>Owner: {pageStore.storeOwner?.storeOwnerName || "Loading..."}</h2>
        <h3>Owner Stores:</h3>
        <ul>
          {stores.map((store) => (
            <li key={store._id}>{store.storeName}</li>
          ))}
        </ul>
        <p>Rating: {pageStore.storeRating || "Loading..."}</p>
        <p>Verified: {pageStore.verified ? "Yes" : "No"}</p>
        <p>Reports: {pageStore.storeReports || "Loading..."}</p>
        <p>Reviews: {pageStore.storeReviews || "Loading..."}</p>
      </div>
    </div>
  );
};

export default ProfileFormStoreDashboard;
