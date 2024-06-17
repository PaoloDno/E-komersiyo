import React from "react";
import { useSelector } from "react-redux";

const ProfileForm = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <div>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>UserID: {user.userID}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfileForm;
