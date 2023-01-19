import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const AuthCheck = onAuthStateChanged(auth, user => {
      if (user) {
        setLoading(false);
      } else {
        console.log('Cant access this page');
        navigate('/login');
      }
    });

    return () => AuthCheck();
  }, []);

  console.log(auth)

  if (loading) return <p className="loading-text">LOADING<span className="loading-dots">...</span></p>;

  return <>{children}</>;
};

export default AuthRoute;
