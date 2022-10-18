import { auth } from '../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // console.log(currentUser.photoURL);
      } else {
        setCurrentUser(null);
      }
    });
  });

  return currentUser;
};

export default useAuth;
