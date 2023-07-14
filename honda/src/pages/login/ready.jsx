import React, { useState, useEffect } from "react";
import HeaderMobile from "../../components/header";
import HondaNon from "../../assets/images/honda-non.png";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Button, Modal, DatePicker } from "antd";
import CartoonBig from "../../assets/images/cartoon-big.png";
import { useSearchParams } from "react-router-dom";

const Ready = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const userid = searchParams.get("userinfo");

  if(userid){
    if(searchParams.get("verifcation") == "true"){
      window.location.href = "/fill-phone"
    }
    else{
      window.location.href = "/home"
    } 
  }

  const clickToStart = () => {window.location.href = "/"}
  return (
    <div>
      <HeaderMobile firstIcon={faChevronLeft} title={(<img src={HondaNon} width="94px"/>)} secondBtn={false} />
      <main>
        <div className="text-center">
          <img src={CartoonBig} className="m-auto pt-12" width="60%"/>
          <h1 className="font-bold mt-8" style={{fontSize:"28px",lineHeight:"34px"}}>สิทธิพิเศษสำหรับสมาชิกใหม่ <br/>Hondanont Loyalty</h1>
          <div className="px-6">
            <p className="leading-5" style={{marginTop:"14px",color:"#585858"}}>เมื่อสมัครสมาชิกกับเรา รับไปเลย 50 คะแนนฟรี! 
    ร่วมสนุกเก็บสะสมคะแนน แลกของรางวัลต่างๆ
    จาก Honda Nonthaburi ที่ตั้งใจมอบให้กับลูกค้า
    คนพิเศษ ผ่านเว็บได้ตลอดเวลา</p>
            <Button className="save-btn active mt-16" onClick={clickToStart}>เริ่มต้นใช้งาน</Button>
          </div>
        </div>
      </main>
    </div>
  )  
}

export default Ready;