import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import HeaderMobile from "../components/header";

const PointCollection = () => {
  return (
    <div>
      <HeaderMobile firstLink="/" firstIcon={faChevronLeft} title="วิธีเก็บคะแนน" secondBtn={false}/>
      <main className="p-6">
        <h2 className="font-bold">เงื่อนไขในการให้คะแนน</h2>
        <ul className="text-sm list-disc mt-3 ps-4 list-items" style={{color:"#585858"}}>
          <li>ค่าบริการปกติ ทุก 500 บาท มีค่าเท่ากับ 1 คะแนน</li>
          <li>ค่าบริการซ่อมสีและตัวถัง (ฺB/P) กรณีประกันจ่าย 1,000 บาท มีค่าเท่ากับ 1 คะแนน</li>
        </ul>
      </main>
    </div>
  )
}

export default PointCollection;