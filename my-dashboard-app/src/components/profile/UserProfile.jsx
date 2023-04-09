import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/apiService';

const UserProfile = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo(userId);
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {userInfo ? (
        <div>
          <h1>{userInfo.firstName}</h1>
          {/* Affichez d'autres informations sur l'utilisateur ici */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
