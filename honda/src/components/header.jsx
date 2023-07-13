import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useFrappeGetCall } from "frappe-react-sdk";

const HeaderMobile = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="p-6 flex items-center justify-between fixed w-full bg-white top-0 z-50" style={{boxShadow:"0 3px 15px 0 #7777771A",maxHeight:"71px"}}>
        <div className="flex" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={props.firstIcon} className="text-2xl" style={{minWidth:"24px"}}/>
        </div>
        <h1 className={`font-bold text-lg`}>{props.title}</h1>
        <Link to={props.secondLink} className={`text-2xl w-6 flex ${(props.secondBtn == false ? "invisible" : "")}`}>
          <FontAwesomeIcon icon={props.secondIcon} className="text-2xl" style={{minWidth:"24px"}}/>
        </Link>
      </header>
    </div>
  )
}

export default HeaderMobile;