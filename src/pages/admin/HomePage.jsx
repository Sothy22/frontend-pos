import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  // useEffect(() => {
  //   document.title = "Home";
  // }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Home Page</h2>
      <NavLink to="/product">
        Product Page
      </NavLink>
    </div>
  );
};

export default HomePage;