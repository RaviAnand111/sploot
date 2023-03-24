import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetail } from "../Helper/Auth";
import "./Navbar.css";

function Navbar() {
  const [userData, setUserData] = useState({});
  const data = useSelector((state) => state?.userProfile?.profile?.data);
  useEffect(() => {
    const getData = async () => {
      const userAns = await getUserDetail();
      setUserData(userAns?.data);
    };
    if (!data) getData();
    else {
      setUserData(data);
    }
  }, []);

  return (
    <div className="navbar-container">
      <a href="/">
        <img src="/sploot-logo.jpg" alt="logo" width="80px" height="30px"></img>
      </a>

      {userData && (
        <div className="user-profile">
          <img src={userData?.photoUrl} alt="logo" width="30px" height="30px" />
          <p>{userData?.name}</p>
        </div>
      )}
    </div>
  );
}

export default Navbar;
