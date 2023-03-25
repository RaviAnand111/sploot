import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfileIcon } from "../asset";
import { addProfile, removeProfile } from "../features/profile/profileSlice";
import { getUserDetail } from "../Helper/Auth";
import "./Navbar.css";

function Navbar() {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.userProfile?.profile?.data);
  useEffect(() => {
    const getData = async () => {
      const userAns = await getUserDetail();
      setUserData(userAns?.data);
    };
    if (!data) getData();
    else {
      dispatch(addProfile(data));
      setUserData(data);
    }
  }, [data]);

  function handleLogOut() {
    localStorage.removeItem("userToken");
    dispatch(removeProfile());
    window.location.href = "/login";
  }

  return (
    <div className="navbar-container">
      <a href="/">
        <img src="/sploot-logo.jpg" alt="logo" width="80px" height="30px"></img>
      </a>
      {console.log(userData, "usr")}
      {userData && (
        <div className="user">
          <button onClick={handleLogOut} className="logout-btn">
            Log Out
          </button>
          <div className="user-profile">
            <img
              src={userData?.photoUrl}
              alt="logo"
              width="30px"
              height="30px"
            />
            <p>{userData?.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
