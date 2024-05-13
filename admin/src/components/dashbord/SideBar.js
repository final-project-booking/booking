import React, { useState } from 'react';
import { name } from "../../env";
import { RiAdminFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { SiHotelsdotcom } from "react-icons/si";
import { useNavigate } from "react-router-dom";

import "./dashBord.css";

const SideBar = () => {
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [usersClicked, setUsersClicked] = useState(false);
  const [hotelsClicked, setHotelsClicked] = useState(false);
const navigate = useNavigate();

  const handleDashboardClick = () => {
    setDashboardClicked(true);
    setUsersClicked(false);
    setHotelsClicked(false);

    navigate("/admin/dashboard");
  };

  const handleUsersClick = () => {
    setUsersClicked(true);
    setDashboardClicked(false);
    setHotelsClicked(false);
    navigate("/admin/user");


  };

  const handleHotelsClick = () => {
    setHotelsClicked(true);
    setUsersClicked(false);
    setDashboardClicked(false);
    navigate("/admin/hotels");

  };

  return (
    <div className="sideBar">
      <div className='dashBord sideBarAdmin'>
        <RiAdminFill className='logo' size={50} />
        <h1 >{name}</h1>
      </div>
      <div className={`dashBord ${dashboardClicked ? 'clicked' : ''}`} onClick={handleDashboardClick}>
        <MdSpaceDashboard className='logo' size={50} />
        <h1>Dashboard</h1>
      </div>
      <div className={`dashBord ${usersClicked ? 'clicked' : ''}`} onClick={handleUsersClick}>
        <FaUserFriends className='logo' size={50} />
        <h1>Users</h1>
      </div>
      <div className={`dashBord ${hotelsClicked ? 'clicked' : ''}`} onClick={handleHotelsClick}>
        <SiHotelsdotcom className='logo' size={50} />
        <h1>Hotels</h1>
      </div>
    </div>
  );
};

export default SideBar;
