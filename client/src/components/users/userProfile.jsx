import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile({ token }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: token
          }
        });
        setUser(response.data.user);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {user && (
        <div>
          <h1>User Profile</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Display other user details as needed */}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
