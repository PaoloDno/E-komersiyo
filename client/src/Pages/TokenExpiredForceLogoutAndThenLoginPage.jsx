import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/actions/authThunks";

const TokenExpiredForcedLogoutAndThenLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogout = async () => {
      await dispatch(logout()).unwrap();
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000); // 2-second delay before redirecting
    };

    handleLogout();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loading ? (
        <>
          <h1>Token expired</h1>
          <p>Redirecting to landing page...</p>
        </>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default TokenExpiredForcedLogoutAndThenLoginPage;
