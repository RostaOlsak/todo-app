import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [auther, setAuther] = useState(false);

  const signWithGoogle = async () => {
    setAuther(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAuther(false);
      });
  };
  return (
    <div className="signup-container">
      <div className="main">
        <div className="signup">
          <form>
            <label className="login-label" htmlFor="chk" aria-hidden="true">
              TO:DO/<span className="span-text">SIGNIN</span>
            </label>
            <button className="sign-in-button" onClick={() => signWithGoogle()} disabled={auther}>
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
