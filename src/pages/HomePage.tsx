import React from "react";
import {getAuth, signOut} from "firebase/auth";

export interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = (props) => {
  const auth = getAuth()
  return (
    <section className="Add-background-box">
      <div className="title">TO:DO</div>
      <div className="input-container">
        <input type="text" className="add-input" />
        <button className="add-button">ADD TO DO</button>
      </div>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </section>
  );
};

export default HomePage;
