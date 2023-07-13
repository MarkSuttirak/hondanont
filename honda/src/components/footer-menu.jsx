import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faHouse, faGift, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const FooterMenu = (props) => {
  return (
    <footer className="pt-4 pb-3 pr-2 fixed w-full bg-white bottom-0 z-50" style={{borderTop:"1px solid #F8F8F8"}}>
      <nav>
        <ul className="block w-full">
          <li className={`text-sm inline-block text-center w-1/4 bg-white ${(props.activeMenu === 1 ? "primary-color" : "menu-inactive-color")}`}>
            <Link to="/">
              <FontAwesomeIcon icon={faHouse} className="block text-xl m-auto"/>
              <span className={`mt-1 inline-block ${(props.activeMenu === 1 ? "font-bold" : "font-medium")}`}>หน้าหลัก</span>
            </Link>
          </li>
          <li className={`text-sm inline-block text-center w-1/4 bg-white ${(props.activeMenu === 2 ? "primary-color" : "menu-inactive-color")}`}>
            <Link to="/my-rewards">
              <FontAwesomeIcon icon={faGift} className="block text-xl m-auto"/>
              <span className={`mt-1 inline-block ${(props.activeMenu === 2 ? "font-bold" : "font-medium")}`}>แลกของรางวัล</span>
            </Link>
          </li>
          <li className={`text-sm inline-block text-center w-1/4 bg-white ${(props.activeMenu === 3 ? "primary-color" : "menu-inactive-color")}`}>
            <Link to="/history">
              <FontAwesomeIcon icon={faClockRotateLeft} className="block text-xl m-auto"/>
              <span className={`mt-1 inline-block ${(props.activeMenu === 3 ? "font-bold" : "font-medium")}`}>ประวัติ</span>
            </Link>
          </li>
          <li className={`text-sm inline-block text-center w-1/4 bg-white ${(props.activeMenu === 4 ? "primary-color" : "menu-inactive-color")}`}>
            <Link to="/my-account">
              <FontAwesomeIcon icon={faUser} className="block text-xl m-auto"/>
              <span className={`mt-1 inline-block ${(props.activeMenu === 4 ? "font-bold" : "font-medium")}`}>ข้อมูลของฉัน</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default FooterMenu;